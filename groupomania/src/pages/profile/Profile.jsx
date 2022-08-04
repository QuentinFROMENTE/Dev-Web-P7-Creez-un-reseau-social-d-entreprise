import "./Profile.css";

function Profile () {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    window.addEventListener("DOMContentLoaded", () => {
        if (!userInfo.newProfile) {
            const firstName = document.getElementById("firstName");
            firstName.setAttribute("value", userInfo.firstName);
            const lastName = document.getElementById("lastName");
            lastName.setAttribute("value", userInfo.lastName);
            const job = document.getElementById("job");
            job.setAttribute("value", userInfo.job);
            const pictureProfile = document.getElementById("pictureProfile");
            const oldPicture = pictureProfile.nextElementSibling;
            oldPicture.setAttribute("src", userInfo.pictureProfile);
        }
    })
    
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
                const userInfo = {
                    ...body,
                    token: user.token,
                    newProfile: false,
                    completeName: body.firstName + ' ' + body.lastName,
                    myQuotes: [],
                    quotesLikes: new Map()
                }
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(userInfo));
                document.location.href = "http://localhost:3001/Home";
            })
            .catch(error => console.error(error));
    }

    if (userInfo.pictureProfile) {
        var pictureProfile = userInfo.pictureProfile;
    } else {
        var pictureProfile = "No Picture";
    }
    
    function saveProfile () {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const job = document.getElementById("job").value;
        const body ={userId, firstName, lastName, job, pictureProfile};
            if (JSON.parse(localStorage.getItem("user")).newProfile) {
                profileWithPicture("http://localhost:3000/api/user/profile","POST", body);
            } else {
                profileWithPicture("http://localhost:3000/api/user/update","PUT", body);
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
            <form method="post">
                <div className="profile__form">
                    <label for="firstName">Prénom</label>
                    <input id="firstName" type="text"/>
                </div>
                <div className="profile__form">
                    <label for="lastName">Nom de famille</label>
                    <input id="lastName" type="text"/>
                </div>
                <div className="profile__form">
                    <label for="job">Poste occupé</label>
                    <input id="job" type="text"/>
                </div>
                <div className="profile__form--picture">
                    <label for="pictureProfile">Image de profile</label>
                    <input id="pictureProfile" type="file" accept="image/jpg, image/jpeg, image/png" onChange={upload}/>
                    <img src={pictureProfile} className="profile__picture" alt="Photo Profile"/>
                </div>
                <span onClick={saveProfile} className="button__validation profile__button">Enregistrer le profile</span>
            </form>
        </div>
        )
}

export default Profile