import "./Quote.css";
import BundledEditor from "../../BundledEditor";
import {useRef, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquareXmark} from '@fortawesome/free-solid-svg-icons';

function Quote () {

  const [isPicture, setIsPicture] = useState(false);
  const [isNewQuote, setIsNewQuote] = useState(true);
  const [isEmpty, setIsEmpty] = useState("");

  var pictureQuote = "";

  const pictureStringRef = useRef("");

  function DeletePicture () {
    const pictureNode = pictureStringRef.current;
    pictureNode.setAttribute("src", "");
    setIsPicture(false);
  }

  const Log = () => {
    if(editorRef.current.getContent() === "") {
      console.log(editorRef.current.getContent());
      setIsEmpty("Champ de création de quote obligatoirement utilisé");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const pictureString = pictureStringRef.current.getAttribute("src");
      if(isNewQuote) {
        const body = {
          userId: user.userId,
          date: new Date().toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) +' '+ new Date().toLocaleTimeString('fr-FR'),
          text: editorRef.current.getContent(),
          imageUrl: pictureString,
          usersLiked: new Map()
        }
        fetch("http://localhost:3000/api/quote/", {
          method: 'POST',
          headers: {
            "Content-Type":"application/json",
            "Authorization": `${user.token}`
        },
        body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(quote => {
            user.myQuotes.push(quote.quoteId);
            localStorage.setItem("user", JSON.stringify(user));
            document.location.href = "http://localhost:3001/Home";
          })
          .catch(error => console.error(error));
      } else {
        const quote = JSON.parse(localStorage.getItem("quote"));
        const body = {
          userId: user.userId,
          date: quote.date,
          text: editorRef.current.getContent(),
          imageUrl: pictureString,
          usersLiked: quote.usersLiked
        }
        fetch(`http://localhost:3000/api/quote/${JSON.parse(localStorage.getItem("quote"))._id}`, {
          method: 'PUT',
          headers: {
            "Content-Type":"application/json",
            "Authorization": `${user.token}`
        },
        body: JSON.stringify(body)
        })
          .then(() => {
            localStorage.removeItem("quote");
            localStorage.setItem("user", JSON.stringify(user));
            document.location.href = "http://localhost:3001/Home";
          })
          .catch(error => console.error(error));
      }
    }
    
  };

  function Upload () {
    const pictureNode = document.getElementById("pictureQuote");
    const imageSrc = pictureNode.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageSrc);
    fileReader.addEventListener("loadend", (fileReader) => {
        pictureQuote = fileReader.target.result;
        const newPicture = pictureNode.nextElementSibling;
        newPicture.setAttribute("src", pictureQuote);
        setIsPicture(true);
    })
}

  const editorRef = useRef(null);

  useEffect(()=>{
    if (localStorage.getItem("quote")) {
      setIsNewQuote(false);
      const quoteReader = JSON.parse(localStorage.getItem("quote"));
      if (quoteReader.imageUrl) {
              setIsPicture(true);
      }
    };
  }, []);

  return  (
  <>
    <p className="button__default--active quote__localisation">Créateur de Quote</p>
    <p className="isEmpty">{isEmpty}</p>
    {isNewQuote ?
      <BundledEditor
      tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
      onInit={(evt, editor) => editorRef.current = editor}
      init={{
        placeholder: "Quoi de neuf ?",
        height: 300,
        width: "60%",
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        selector: 'textarea',
        toolbar_mode: 'floating',
        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        mobile : {
          width: "100%",
          toolbar_mode: 'floating',
          toolbar: ['undo redo | blocks | bold italic forecolor','alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent'],
        }
      }}
    />
    :
    <BundledEditor
      tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue = {JSON.parse(localStorage.getItem("quote")).text}
      init={{
        height: 300,
        width: "60%",
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        selector: 'textarea',
        toolbar_mode: 'floating',
        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        mobile : {
          width: "100%",
          toolbar_mode: 'floating',
          toolbar: ['undo redo | blocks | bold italic forecolor','alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent'],
        }
      }}
    />
    }
    
    <div className="quote__picture--form">
      <label for="pictureQuote" className="quote__picture--label">Image de Quote</label>
      {isPicture ? 
        <FontAwesomeIcon icon={faSquareXmark} onClick={DeletePicture} className="quote__picture--delete"/>
        :
        <input id="pictureQuote" type="file" accept="image/jpg, image/jpeg, image/png" onChange={Upload} className="quote__picture--input"/>
      }
      {isNewQuote ? 
      <img src={pictureQuote} ref={pictureStringRef} alt="" className="quote__picture--img" id="pictureString"/>
      :
      <img src={JSON.parse(localStorage.getItem("quote")).imageUrl} ref={pictureStringRef} alt="" className="quote__picture--img"/>
      }
      
    </div>
    <span onClick={Log} className="button__validation quote__validation">Pose ta Quote</span>
  </>
  )
}

export default Quote