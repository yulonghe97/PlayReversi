import React, { useState } from "react";
import JoinRoom from "./JoinRoom";
import WaitingRoom from "./WaitingRoom";
import GamePlayPage from "./GamePlayPage";
import { GameContext } from "./store/context";
import Table from "./Table";
import { Container } from "@material-ui/core";

export default function GamePage() {
  const [room, setRoom] = useState();

  return (
    <GameContext.Provider value={{ room, setRoom }}>
      <JoinRoom />
      {/* <Container>
        <Table />
      </Container> */}
    </GameContext.Provider>
  );
}
