import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import Game from "../../Components/Game";
import ScoreCounter from "../../Components/Game/ScoreCounter/";
import GameUserInfo from "../../Components/GameUserInfo/";
import { socket } from "../../service/socket";
import { GameContext } from "./store/context";

export default function GamePage() {
  const [lastMove, setLastMove] = useState("");
  const [board, setBoard] = useState([]);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.emit("chessDown", { room: roomId, lastMove: lastMove });
  }, [lastMove]);

  useEffect(() => {
    socket.emit("initializeGame", "true");
    socket.on("initializeGame", (data) => {
        setBoard(data.board)
        setRoomId(data.roomId)
    });
  }, []);

  return (
    <GameContext.Provider value={{lastMove, setLastMove, roomId, board, setBoard}}>
    <>
      <Box display="flex" justifyContent="center" pt="10px">
        <ScoreCounter />
      </Box>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ width: "100vw", paddingTop: "50px" }}
      >
        <Grid item xs={4}>
          &nbsp;
        </Grid>
        <Grid item xs={4}>
          <Game />
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column">
            <Box paddingBottom="40px">
              <GameUserInfo />
            </Box>
            <GameUserInfo />
          </Box>
        </Grid>
      </Grid>
    </>
    </GameContext.Provider>
  );
}
