import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons';
import {useState, useEffect} from 'react';

function LikeDislike (props) {
    const quote = props.quote;
    const user = JSON.parse(localStorage.getItem("user"));
    const [liked, setLiked] = useState(false);
    const [likeAvailable, setLikeAvailable] = useState(true);
    const [disliked, setDisliked] = useState(false);
    const [dislikeAvailable, setDislikeAvailable] = useState(true);
    const [numberOfLike, setNumberOfLike] = useState(0);
    const [numberOfDislike, setNumberOfDislike] = useState(0);

    function CountOfLikeDislike(user, usersLiked) {
        for (let i in usersLiked) {
            if (usersLiked[i]) {
                setNumberOfLike(numberOfLike + 1);
                if( i == user.userId) {
                    setDislikeAvailable(false);
                    setLiked(true);
                }
            } else {
                setNumberOfDislike(numberOfDislike + 1);
                if( i == user.userId) {
                    setLikeAvailable(false);
                    setDisliked(true);
                }
            }
        }
    }

    function Like (user, quote) {
        let like = 0;
        if (!liked && !disliked && likeAvailable && dislikeAvailable) {
            like = 1;
        } else if (liked && !disliked && likeAvailable && !dislikeAvailable) {
            like = 0;
        } else {
            alert("Erreur");
        }
        const body = {like: like, userId: user.userId}
        fetch(`http://localhost:3000/api/quote/like/${quote._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify(body)
        })
            .then(resJSON => resJSON.json())
            .then(resJS => {
                const resQuotesLikes = resJS.quotesLikes;
                const resUsersLiked = resJS.usersLiked;
                const resUsersLikedLength = Object.keys(resUsersLiked).length;
                if (resUsersLikedLength != 0) {
                    for (let i in resUsersLiked) {
                        if(i == user.userId && like === 1) {
                            setNumberOfLike(numberOfLike + 1);
                            user.quotesLikes = Object.assign(user.quotesLikes, resQuotesLikes);
                            setDislikeAvailable(false);
                            setLiked(true);
                        } else if (like === 0) {
                            setNumberOfLike(numberOfLike - 1);
                            delete user.quotesLikes[`${quote._id}`];
                            setDislikeAvailable(true);
                            setLiked(false);
                        }
                    }
                } else {
                    setNumberOfLike(numberOfLike - 1);
                    delete user.quotesLikes[`${quote._id}`];
                    setDislikeAvailable(true);
                    setLiked(false);
                }
                localStorage.setItem("user", JSON.stringify(user));
            })
            .catch(error => console.log({error}));
    }

    function Dislike (user, quote) {
        let like = 0;
        if (!liked && !disliked && likeAvailable && dislikeAvailable) {
            like = -1;
        } else if (!liked && disliked && !likeAvailable && dislikeAvailable) {
            like = 0;
        } else {
            alert("Erreur");
        }
        const body = {like: like, userId: user.userId}
        fetch(`http://localhost:3000/api/quote/like/${quote._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify(body)
        })
            .then(resJSON => resJSON.json())
            .then(resJS => {
                const resQuotesLikes = resJS.quotesLikes;
                const resUsersLiked = resJS.usersLiked;
                const resUsersLikedLength = Object.keys(resUsersLiked).length;
                if (resUsersLikedLength != 0) {
                    for (let i in resUsersLiked) {
                        if(i == user.userId && like === -1) {
                            setNumberOfDislike(numberOfDislike + 1);
                            user.quotesLikes = Object.assign(user.quotesLikes, resQuotesLikes);
                            setLikeAvailable(false);
                            setDisliked(true);
                        } else if (like === 0) {
                            setNumberOfDislike(numberOfDislike - 1);
                            user.quotesLikes = Object.assign(user.quotesLikes, resQuotesLikes);
                            setLikeAvailable(true);
                            setDisliked(false);
                        }
                    }
                } else {
                    setNumberOfDislike(numberOfDislike - 1);
                    delete user.quotesLikes[`${quote._id}`];
                    setLikeAvailable(true);
                    setDisliked(false);
                }
                localStorage.setItem("user", JSON.stringify(user));
            })
            .catch(error => console.log({error}));
    }

    useEffect(() => {CountOfLikeDislike(user, quote.usersLiked)} ,[]);

    function LikeOrDislikeUsed () {
        return (
            <div className='home__quoteSettings--likeDislike'>
            {likeAvailable ? 
                (<FontAwesomeIcon icon={faThumbsUp} onClick={() => Like(user, quote)} className="home__quoteSettings--buttonUsed" alt="Retrait du like"/>)
                :
                (<FontAwesomeIcon icon={faThumbsUp} className="home__quoteSettings--buttonDisable" alt="Like désactivé"/>) }
                <div>{numberOfLike}</div>
            {dislikeAvailable ? 
                (<FontAwesomeIcon icon={faThumbsDown} onClick={() => Dislike(user, quote)} className="home__quoteSettings--buttonUsed" alt="Retrait du dislike"/>)
                :
                (<FontAwesomeIcon icon={faThumbsDown} className="home__quoteSettings--buttonDisable" alt="Dislike désactivé"/>) }
                <div>{numberOfDislike}</div>
            </div>
        )
    }

    return (
        <div>
        {likeAvailable && dislikeAvailable ?
        <div className='home__quoteSettings--likeDislike'>
        <FontAwesomeIcon icon={faThumbsUp} onClick={() => Like(user, quote)} className="home__quoteSettings--buttonEnable" alt="Like"/>
        <div>{numberOfLike}</div>
        <FontAwesomeIcon icon={faThumbsDown} onClick={() => Dislike(user, quote)} className="home__quoteSettings--buttonEnable" alt="Dislike"/>
        <div>{numberOfDislike}</div>
        </div>
        :
        <LikeOrDislikeUsed/>
        }
        </div>
    )
}

export default LikeDislike