import "./App.css";
import axios from "axios";
import { useState } from "react";

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

  return (
    <div>
      <h1>Coucou ! bienvenue sur mon Chat GPT !</h1>
      <div className="chatBox">
        <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            cols="60"
            rows="10"
            placeholder="Votre message ici..."
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          ></textarea>
          {!onRequest ? (
            <button>Poser votre question !</button>
          ) : (
            <p>En cours de traitement...</p>
          )}
        </form>
        {response && (
          <div className="ansewr">
            <h2>Voici votre réponse...</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
