import "./Auth.css";
import logo from "../../assets/logos/icon-left-font.svg";
import {useState} from 'react';

function AuthPage () {
    const [isLogin, setIsLogin] = useState(true);
    function logIn () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const body = {email, password};
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(
            console.log('LogIn réussi')
            /*Redirection vers page thread*/
            )
        .catch(error => console.log({error}));
    }
    function signUp () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordSecurity = document.getElementById('passwordSecurity').value;
        const body = {email, password};

        if (password === passwordSecurity) {
            fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body : JSON.stringify(body),
            })
            .then(() => logIn())
            .catch(error => console.log(error));
        } else {
            const secondPassword = document.getElementById('secondPassword');
            const childSP = secondPassword.childNodes;
            if (childSP.length === 2) {
                const errorMsg = document.createElement('p');
                errorMsg.innerText = "Mots de Passes différents";
                secondPassword.appendChild(errorMsg);
            }
        }
    }
    
    return isLogin ? (
        <div>
            <img src={logo} alt="Logo Groupomania" className="authPage__logo"/>
            <span onClick={() => setIsLogin(false)}>S'enregistrer</span>
            <span id="log" onClick={() => setIsLogin(true)}>Se Connecter</span>
            <form method="post">
            <div className="form">
                <label for="email">Email</label>
                <input id="email" type="email"/>
            </div>
            <div className="form">
                <label for="password" type="password">Mot de passe</label>
                <input id="password" type="password"/>
            </div>
            <input className="button" type="button" value="Se Connecter" onClick={logIn}/>
        </form>
        </div>
        ) : (
            <div>
                <img src={logo} alt="Logo Groupomania" className="authPage__logo"/>
            <span id="log" onClick={() => setIsLogin(false)}>S'enregistrer</span>
            <span onClick={() => setIsLogin(true)}>Se Connecter</span>
            <form method="post">
            <div className="form">
                <label for="email">Email</label>
                <input id="email" type="email"/>
            </div>
            <div className="form">
                <label for="password" type="password">Mot de passe</label>
                <input id="password" type="password"/>
            </div>
            <div id="secondPassword"  className="form">
                <label for="passwordSecurity" type="password">Confirmation Mot de passe</label>
                <input id="passwordSecurity" type="password"/>
            </div>
            <input className="button" type="button" value="S'enregistrer" onClick={signUp}/>
        </form>
        </div>
        )
}

export default AuthPage