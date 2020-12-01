import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Backdrop } from "@material-ui/core";
import Game from "../../Components/Game";
import ScoreCounter from "../../Components/Game/ScoreCounter";
import GameUserInfo from "../../Components/GameUserInfo";
import { socket } from "../../service/socket";

// Controller
import { GameContext } from "../../context/GameContext";
import { UserContext } from "../../context/UserContext";

export default function GamePlayPage() {
  const [loading, setLoading] = useState(true);
  // const { room, setRoom } = useContext(GameContext);
  const { user } = useContext(UserContext);
  const { lastMove, setLastMove, board, setBoard, room, game, side } = useContext(
    GameContext
  );

  useEffect(() => {
    socket.emit("chessDown", {
      room: room.roomId,
      lastMove: lastMove,
      userId: user._id,
      side: side,
    });
  }, [lastMove]);

  useEffect(() => {}, []);

  return (
    <>
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
              <GameUserInfo
                users={room.currentPlayers}
                userId={user._id}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
