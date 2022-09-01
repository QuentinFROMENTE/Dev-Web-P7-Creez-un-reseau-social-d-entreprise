import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';
import {useState, useEffect} from 'react';

function Modification (props) {

    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        if (props.user.administrator || props.user.userId === props.quote.userId) {
            setIsAvailable(true);
        }
    }, []);

    function Redirection () {
        localStorage.setItem("quote", JSON.stringify(props.quote));
        document.location.href ="http://localhost:3001/Quote";
    }

    return ( isAvailable ?
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => Redirection()} className="home__quoteSettings--buttonUsed" alt="Modification de la quote"/>
        :
        <FontAwesomeIcon icon={faPenToSquare} className="home__quoteSettings--buttonDisable" alt="Modification de la quote"/>
    )
}

export default Modification