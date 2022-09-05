import "./Profile.css";
import {useState} from 'react';

function Profile () {

    const [errorMsg, setErrorMsg] = useState("");    
    const userInfo = JSON.parse(localStorage.getItem("user"));
    
    function profileWithPicture (url, method, body) {
        const user = JSON.parse(localStorage.getItem("user"));
        fetch(url, {
            method: method,
            headers: {
                "Content-Type":"application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify(body)
        })
            .then(() => {
                let userInfo = {};
                if (method === 'POST') {
                    userInfo = {
                        ...body,
                        token: user.token,
                        newProfile: false,
                        completeName: body.firstName + ' ' + body.lastName,
                        myQuotes: [],
                        quotesLikes: new Map()
                    }
                } else {
                    userInfo = {
                        ...body,
                        token: user.token,
                        newProfile: false,
                        completeName: body.firstName + ' ' + body.lastName,
                        myQuotes: user.myQuotes,
                        quotesLikes: user.quotesLikes
                    }
                }
                localStorage.setItem("user", JSON.stringify(userInfo));
                document.location.href = "http://localhost:3001/Home";
            })
            .catch(error => console.error(error));
    }
    var pictureProfile = ""
    if (userInfo.pictureProfile) {
        pictureProfile = userInfo.pictureProfile;
    }
    function saveProfile () {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const completeName = firstName + ' ' + lastName;
        const job = document.getElementById("job").value;
        const body ={userId, firstName, lastName, completeName, job, pictureProfile};
        if (body.firstName !== "" && body.lastName !== "" && body.job !== "" && body.pictureProfile !== "")
            {
            if (JSON.parse(localStorage.getItem("user")).newProfile) {
                profileWithPicture("http://localhost:3000/api/user/profile","POST", body);
            } else {
                profileWithPicture("http://localhost:3000/api/user/update","PUT", body);
            }
        } else {
            setErrorMsg("Tous les champs sont obligatoire");
        }

        }

    function upload () {
        const pictureNode = document.getElementById("pictureProfile");
        const imageSrc = pictureNode.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageSrc);
        fileReader.addEventListener("loadend", (fileReader) => {
            pictureProfile = fileReader.target.result;
            const newPicture = pictureNode.nextElementSibling;
            newPicture.setAttribute("src", pictureProfile);
        })
    }
        
    return (<div>
            <p className="button__default--active profile__localisation">Gestionnaire de profile</p>
            <p className="errorMsg">{errorMsg}</p>
            <form method="post">
                <div className="profile__form">
                    <label for="firstName">Prénom</label>
                    <input id="firstName" type="text" value={userInfo.firstName}/>
                </div>
                <div className="profile__form">
                    <label for="lastName">Nom de famille</label>
                    <input id="lastName" type="text" value={userInfo.lastName}/>
                </div>
                <div className="profile__form">
                    <label for="job">Poste occupé</label>
                    <input id="job" type="text" value={userInfo.job}/>
                </div>
                <div className="profile__form--picture">
                    <label for="pictureProfile">Image de profile</label>
                    <input id="pictureProfile" type="file" accept="image/jpg, image/jpeg, image/png" onChange={upload}/>
                    <img src={pictureProfile} className="profile__picture" alt="Portrait Profile"/>
                </div>
                <span onClick={saveProfile} className="button__validation profile__button">Enregistrer le profile</span>
            </form>
        </div>
        )
}

export default Profile