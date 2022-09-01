import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {useState, useEffect} from 'react';

function Supression (props) {
    const quote = props.quote;

    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        if (props.user.administrator || props.user.userId === props.quote.userId) {
            setIsAvailable(true);
        }
    },[]);

    function DeleteAQuote (user, quote) {
        fetch(`http://localhost:3000/api/quote/${quote._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user.token}`
        }})
            .then(res => {
                if (res.ok) {
                    window.location.reload();
                }
            })
            .catch(err => console.log({err}))
        
    }

    return ( isAvailable ?
        <FontAwesomeIcon icon={faTrashCan} onClick={()=> DeleteAQuote(props.user, quote)} className="home__quoteSettings--delete" alt="Supression de la quote"/>
        : 
        <FontAwesomeIcon icon={faTrashCan} className="home__quoteSettings--buttonDisable" alt="Supression de la quote"/>
        )
}

export default Supression