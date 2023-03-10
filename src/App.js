// create a react component that inputs a textarea message then performs a fetch request to localhost:3001 gets back a response as a data.message and that message in a box below

import React, { useState } from "react";
import "./App.css";
import "inter-ui/inter.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <div className="form">
        <h1>DMKD</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            placeholder="Ask Kevin Durant a question"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
          <div className="response">
            {response && (
              <div>
                <b>KD:</b> {response}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
