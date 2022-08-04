import "./Auth.css";
import "../../styles/index.css"
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    const password = document.getElementById('passwordNode');
                        const childPassword = password.childNodes;
                        if (childPassword.length === 2) {
                            const errorMsg = document.createElement('p');
                            errorMsg.innerText = "Adresse email ou mot de passe incorrect";
                            password.appendChild(errorMsg);
                        }
                }
            })
            .then((user) => {
                    localStorage.setItem("user", JSON.stringify({userId: user.userId, token:`Bearer ${user.token}`, newProfile: false}));
                    const userInfo = JSON.parse(localStorage.getItem("user"));
            fetch(`http://localhost:3000/api/user/${userInfo.userId}`, 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${userInfo.token}`
                    },
                })
                .then((res) => {
                    return res.json()
                })
                .then(user => {
                    const userCompleteInfo = {
                        userId: userInfo.userId,
                        token: userInfo.token,
                        newProfile: false,
                        completeName: user.completeName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        pictureProfile: user.pictureProfile,
                        job: user.job,
                        myQuotes: user.myQuotes,
                        quotesLikes: user.quotesLikes
                    }
                    localStorage.removeItem("user");
                    localStorage.setItem("user", JSON.stringify(userCompleteInfo));
                    document.location.href = "http://localhost:3001/Home";
                })
                .catch(error => console.log(error));
            })
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
                .then(res => {
                    if (res.ok) {
                        fetch("http://localhost:3000/api/auth/login", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(body)
                        })
                        .then((res) => {
                            return res.json()
                        })
                        .then((user) => {
                            const body = {userId: user.userId, token:`Bearer ${user.token}`, newProfile: true};
                            localStorage.setItem("user", JSON.stringify(body));
                            document.location.href = "http://localhost:3001/Profile";
                        })
                        .catch(error => console.log({error}))
                    } else {
                        const email = document.getElementById('emailNode');
                        const childEmail = email.childNodes;
                        if (childEmail.length === 2) {
                            const errorMsg = document.createElement('p');
                            errorMsg.innerText = "Adresse email déjà utilisée";
                            email.appendChild(errorMsg);
                        }
                    }
                })
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
            <span onClick={() => setIsLogin(false)} className="button__default authPage__button--left">S'enregistrer</span>
            <span onClick={() => setIsLogin(true)} className="button__default--active authPage__button--right">Se Connecter</span>
            <form method="post">
            <div className="authPage__form">
                <label for="email">Email</label>
                <input id="email" type="email"/>
            </div>
            <div id="passwordNode" className="authPage__form authPage__form--bottom">
                <label for="password" type="password">Mot de passe</label>
                <input id="password" type="password"/>
            </div>
            <span onClick={logIn} className="button__validation authPage__button--validation">Se Connecter</span>
        </form>
        </div>
        ) : (
            <div>
                <img src={logo} alt="Logo Groupomania" className="authPage__logo"/>
            <span onClick={() => setIsLogin(false)} className="button__default--active authPage__button--left">S'enregistrer</span>
            <span onClick={() => setIsLogin(true)} className="button__default authPage__button--right">Se Connecter</span>
            <form method="post">
            <div id="emailNode" className="authPage__form">
                <label for="email">Email</label>
                <input id="email" type="email"/>
            </div>
            <div className="authPage__form">
                <label for="password" type="password">Mot de passe</label>
                <input id="password" type="password"/>
            </div>
            <div id="secondPassword"  className="authPage__form authPage__form--bottom">
                <label for="passwordSecurity" type="password">Confirmation MdP</label>
                <input id="passwordSecurity" type="password"/>
            </div>
            <span onClick={signUp} className="button__validation authPage__button--validation">S'enregistrer</span>
        </form>
        </div>
        )
}

export default AuthPage