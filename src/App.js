import "./App.css";
import axios from "axios";
import { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [response, setResponse] = useState();
  const [question, setQuestion] = useState("");
  const [onRequest, setOnRequest] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const responseData = async (request) => {
      try {
        setOnRequest(true);
        const response = await axios.post(
          "https://site--gpt-exercice--vqtmsgjlf7qx.code.run/chat/",
          {
            question: request,
          }
        );
        setResponse(response.data.response);
        setOnRequest(false);
      } catch (error) {
        console.log(error);
      }
    };
    responseData(question);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <div className="chatBox">
      <div>
        <h1>Bienvenue sur mon GPT</h1>
        {!response && (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <textarea
              className="textarea"
              name="message"
              rows="10"
              placeholder="Votre message ici..."
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
              }}
            ></textarea>
            {!onRequest ? (
              <button className="textarea-button">
                Poser votre question !
              </button>
            ) : (
              <p>En cours de traitement...</p>
            )}
          </form>
        )}

        {response && (
          <div className="response">
            <h2>Voici votre réponse à la question : {question}</h2>
            <p>{response}</p>
            <CopyToClipboard
              text={response}
              onCopy={() => alert("Réponse copiée !")}
            >
              <span className="response-copy">
                Copier la réponse dans le presse-papier
              </span>
            </CopyToClipboard>
            <button
              className="textarea-button"
              onClick={() => {
                setResponse("");
              }}
            >
              Poser une nouvelle question !
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
