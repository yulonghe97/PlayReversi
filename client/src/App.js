import React, { useState, useEffect } from "react";
import Routes from "./routes";
import Game from "./Components/Game";
import GamePage from "./View/Game/GamePlayPage";
import NavBar from "./Components/NavBar/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
  }, []);

  return (
    <>
      {/* It's <time dateTime={response}>{response}</time> */}
      <NavBar />
      <Routes/>
    </>
  );
}

export default App;
