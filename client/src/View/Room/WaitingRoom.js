import React, { useEffect, useState, useContext } from "react";
import { Box, Button } from "@material-ui/core";
import GameUserInfo from "../../Components/GameUserInfo";
import { useParams } from "react-router-dom";
import { socket } from "../../service/socket";
// import { GameContext } from "../Game/store/context";

export default function WaitingRoom() {
  const { id } = useParams();

  const [ room, setRoom ] = useState("");

  // get user info
  const currentUser = JSON.parse(window.localStorage.getItem("_user"));
  // Join the waiting room


  useEffect(() => {
    setRoom([currentUser]);
    socket.on("joinRoom", (data) => setRoom(data));
    socket.on("leaveRoom", (data) => setRoom(data));
    socket.emit("joinRoom", { roomId: id, user: currentUser.name, userId: currentUser._id });
  }, []);

  const onLeaveRoom = () => {
    socket.emit("leaveRoom", { roomId: id, userId: currentUser._id });
    window.location.href = "/";
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <h1>Room # {id}</h1>
      </Box>
      {/* <Box display="flex" justifyContent="center">
        <GameUserInfo users={room} />
      </Box> */}
      <Box display="flex" justifyContent="center" mt="40px">
        {/* {room.length !== 2 ? (
          <Button variant="contained" color="primary" disabled>
            Start
          </Button>
        ) : (
          <Button variant="contained" color="primary">
            Start
          </Button>
        )} */}
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "20px" }}
          onClick={onLeaveRoom}
        >
          Leave
        </Button>
      </Box>
    </>
  );
}
