import React, { useState, useEffect } from "react";
import Game from "./Components/Game";
import GamePage from "./View/Game/GamePage";
import NavBar from "./Components/NavBar/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
  }, []);



  return (
    <>
      {/* It's <time dateTime={response}>{response}</time> */}
      <NavBar />
      <GamePage />
    </>
  );
}

export default App;
