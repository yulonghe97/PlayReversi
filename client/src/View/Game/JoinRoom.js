import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { socket } from "../../service/socket";
import { useHistory } from "react-router-dom";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("joinRoom", (data) => {
      console.log(data);
      if (data.status === 200) {
        window.location.href = `/game/${data.roomId}`
      }
    });
  }, []);

  const onJoinRoom = () => {
    socket.emit("joinRoom", { roomId: roomId });
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" mb="10px">
        <h1>Join Room</h1>
      </Box>
      <Box display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          label="# Room"
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
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "20px" }}
          onClick={onJoinRoom}
        >
          Join
        </Button>
      </Box>
    </div>
  );
}
