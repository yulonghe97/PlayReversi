import React, { useState, useEffect, useContext } from "react";
import JoinRoom from "./JoinRoom";
import GamePlayPage from "./GamePlayPage";
import { GameContext } from "../../context/GameContext";
import InitializeGame from "./InitializeGame";

export default function GamePage() {
  const { room, initialized, setInitialized, game, setGame } = useContext(
    GameContext
  );

  return (
    <>
      <InitializeGame />
    </>
  );
}
