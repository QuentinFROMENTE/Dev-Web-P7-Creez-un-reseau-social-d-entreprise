import './Home.css';
import {Link} from "react-router-dom";
import logo from "../../assets/logos/icon-left-font.svg";
import Thread from "../../components/home/Thread";
import {useState} from 'react';
import { useEffect } from 'react';


function Home () {

    if(localStorage.getItem("quote")) {
        localStorage.removeItem("quote")
    }

    const user = JSON.parse(localStorage.getItem("user"));
    let [thread, setThread] = useState([]);

    async function FetchingServerForThread (user) {
        const fetchApiQuote = await fetch('http://localhost:3000/api/quote',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user.token}`
            }
        }
        );
        const res = await fetchApiQuote.json();
        setThread(res);
    };
    
    useEffect(()=> {FetchingServerForThread(user);} , []);

    return (
        <>
            <nav className='home__navbar'>
                <img src={logo} alt="Logo Groupomania" className="home__navbar--logo"/>
                <div className='home__navbar--positionButton'>
                    <Link to="/" onClick={() => {localStorage.removeItem("user")}} className="button__default home__navbar--button">Déconnexion</Link>
                    <Link to="/Profile" className='button__default home__navbar--button'>Profile</Link>
                    <Link to="/Quote" className='button__default home__navbar--button'>Nouveau poste</Link>
                </div>
            </nav>
            <main id="thread" className='home__thread'>
                <Thread thread={thread}/>
            </main>
        </>
    )
}

export default Home