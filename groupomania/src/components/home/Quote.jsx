import LikeDislike from "./LikeDislike";
import Modification from "./Modification";
import Supression from "./Delete";
import { useEffect, useState } from "react";

function Quote (props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const quote = props.quote;
    let [authorInfo, setAuthorInfo] = useState({});
    async function FetchingServerForUser(user, quote) {
        const body = {userId: user.userId};
        const fetchApiAuthor = await fetch(`http://localhost:3000/api/user/${quote.userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user.token}`
        },
        body: JSON.stringify(body)
        }
        );
        const author = await fetchApiAuthor.json();
        setAuthorInfo(author);
        const quoteNode = document.createElement("div");
        quoteNode.setAttribute("class", "home__quoteData--text");
        quoteNode.innerHTML = quote.text;
        const quoteBody = document.getElementById(quote._id);
        quoteBody.prepend(quoteNode);

    }

    useEffect(() => {FetchingServerForUser(user, quote)}, []);

    return (
    <article className="home__quote">
        <div className="home__quoteInfo">
            <img alt={`portrait de ${authorInfo.completeName}`} src={authorInfo.pictureProfile} className="home__quoteInfo--pictureProfile"/>
            <div className="home__quoteInfo--author">
                <span className="home__quoteInfo--authorName">{authorInfo.completeName}</span>
                <span>{authorInfo.job}</span>
                <span>{quote.date}</span>
            </div>

        </div>
        {quote.imageUrl ? (
        <div id={quote._id} className="home__quoteData">
            <img alt={`Illustration du poste par ${authorInfo.completeName}`} src={quote.imageUrl} className="home__quoteData--picture"/>
        </div>
        ):(
        <div id={quote._id} className="home__quoteData">
        </div>
        )}
        <div className="home__quoteSettings">
            <LikeDislike quote={quote}/>
            <Modification quote={quote} user={user}/>
            <Supression quote={quote} user={user}/>
        </div>
    </article>)
}

export default Quote