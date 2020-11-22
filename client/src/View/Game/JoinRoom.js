import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { socket } from "../../service/socket";
import { useHistory } from "react-router-dom";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const onJoinRoom = () => {
    // Store the user info
    window.localStorage.setItem("currentUser", currentUser);
    window.location.href = `/waiting/${roomId}`;
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" mb="10px">
        <h1>Join Room</h1>
      </Box>
      <Box display="flex" justifyContent="center" mt="20px">
        <TextField
          variant="outlined"
          label="User"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          InputProps={{
            style: {
              fontFamily: "Century Gothic, Futura, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt="20px">
        <TextField
          variant="outlined"
          label="Room #"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          InputProps={{
            style: {
              fontFamily: "Century Gothic, Futura, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            },
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        mt="30px"
        onClick={() => onJoinRoom()}
      >
        <Button variant="contained" size="large" color="primary">
          Join
        </Button>
      </Box>
    </div>
  );
}
