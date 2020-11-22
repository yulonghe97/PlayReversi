import React, { useState, useEffect, useContext } from "react";
import { Grid, Box } from "@material-ui/core";
import Game from "../../Components/Game";
import ScoreCounter from "../../Components/Game/ScoreCounter";
import GameUserInfo from "../../Components/GameUserInfo";
import { socket } from "../../service/socket";
import { GameContext } from "./store/context";
import { useParams } from "react-router-dom";

export default function GamePlayPage() {
  const [lastMove, setLastMove] = useState("");
  const [user, setUser] = useState([]);
  const [board, setBoard] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const { id } = useParams();

  // const { room, setRoom } = useContext(GameContext);

  // get user info
  const currentUser = {
    username: window.localStorage.getItem("currentUser"),
  };

  useEffect(() => {
    setUser([currentUser]);
  }, [])

  useEffect(() => {
    socket.emit("chessDown", { room: roomId, lastMove: lastMove });
  }, [lastMove]);

  useEffect(() => {
    setRoomId(id);
    socket.emit("joinRoom", { roomId: id, user: currentUser.username });
    socket.emit("initializeGame", "true");

    // Wait for opponent to join
    socket.on("joinRoom", (data) => {
        setUser([...user, {username: data.user}])
    })

    socket.on("initializeGame", (data) => {
      setBoard(data.board);
    });

  }, []);

  return (
    <GameContext.Provider
      value={{ lastMove, setLastMove, roomId, board, setBoard }}
    >
      <>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          {/* <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column">
              <Box paddingBottom="40px">
                <GameUserInfo />
              </Box>
            </Box>
          </Grid> */}
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
              <Box paddingBottom="40px">
                <GameUserInfo users={user} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Grid
        container
        justify="center"
        alignItems="center"
        // style={{ width: "100vw", paddingTop: "50px" }}
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
      </Grid> */}
      </>
    </GameContext.Provider>
  );
}