import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Backdrop } from "@material-ui/core";
import Game from "../../Components/Game";
import ScoreCounter from "../../Components/Game/ScoreCounter";
import GameUserInfo from "../../Components/GameUserInfo";
import GameEndDialog from "../../Components/Game/GameEnd/";
import { socket } from "../../service/socket";

// Controller
import { GameContext } from "../../context/GameContext";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";

export default function GamePlayPage() {
  const { user } = useContext(UserContext);
  const { lastMove, room, game, setGame, side, setAvailableMoves, gameEnd, setGameEnd, gameResult, setGameResult } = useContext(
    GameContext
  );
  const { setError } = useContext(MessageContext);

  const [gameLastMove, setGameLastMove] = useState(false);


  useEffect(() => {
    if (lastMove) {
      if (game.turn === side) {
        socket.emit("chessDown", {
          room: room.roomId,
          lastMove: lastMove,
          userId: user._id,
          side: side,
          board: game.board,
          gameId: game._id,
        });
        setAvailableMoves([]);
      } else {
        setError("Not Your Turn!");
      }
    }
  }, [lastMove]);

  useEffect(() => {
    if (gameLastMove) {
      console.log('Last Move!');
      socket.emit("gameEnd", {
        gameId: game._id,
        roomId: room._id,
      });
    }
  }, [gameLastMove]);

  useEffect(() => {
    socket.on("chessDown", (res) => {
      if (res.data.turn === side) {
        socket.emit("availableMoves", {
          board: res.data.board,
          side: side,
        });
      }
      setGame(res.data);
    });
    socket.on("availableMoves", (res) => {
      setAvailableMoves(res.data);
    });
    socket.on("OppoNoAvailableMoves", () => {
      setGameLastMove(true);
    });
    socket.on("gameEnd", (res) => {
      setGameEnd(true);
    })
  }, []);

  return (
    <>
      <GameEndDialog />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item lg={3}>
          &nbsp;
        </Grid>
        <Grid item sm={12} sm={8} md={6} lg={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="600px"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center" pt="100px" pb="40px">
              <ScoreCounter />
            </Box>
            <Game />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Box display="flex" flexDirection="column">
            <Box paddingBottom="40px" paddingTop="100px">
              <GameUserInfo users={room.currentPlayers} userId={user._id} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
