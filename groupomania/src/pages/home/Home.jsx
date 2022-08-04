import './Home.css';
import {Link} from "react-router-dom";

function Home () {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch('http://localhost:3000/api/quote', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${user.token}`
        },
    })
        .then(quoteMainThread => {

        })
        .catch();

    
    return ('merde')
}

export default Home