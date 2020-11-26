import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Backdrop } from "@material-ui/core";
import GameUserInfo from "../../Components/GameUserInfo";
import { useParams, useHistory } from "react-router-dom";
import { socket } from "../../service/socket";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../../Components/Loading";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function WaitingRoom() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [room, setRoom] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // get user info
  const currentUser = JSON.parse(window.localStorage.getItem("_user"));
  // Join the waiting room

  const updateRoom = (res) => {
    if (res.data) {
      setRoom(res.data);
      setPlayers(res.data.currentPlayers);
      setLoading(false);
    } else {
      setValid(false);
      alert('Invalid Room')
      history.replace('/');
    }
  };

  useEffect(() => {
    socket.on("joinRoom", (res) => updateRoom(res));
    socket.on("leaveRoom", (res) => updateRoom(res));
    socket.on("sessionExpired", () => {
      setDisabled(true);
    });
    setLoading(true);
    socket.emit("joinRoom", {
      roomId: id,
      user: currentUser.name,
      userId: currentUser._id,
    });
  }, []);

  const onLeaveRoom = () => {
    socket.emit("leaveRoom", { roomId: id, userId: currentUser._id });
    history.replace("/");
  };

  const inValidMessage =  
    <><p>Invalid Room</p></>;

  const validWaitingRoom = 
    <>
      <Box display="flex" justifyContent="center" mt="30px">
        <h1>Room # {id}</h1>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt="20px">
          <Loading size="lg" />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center" mt="40px">
            <GameUserInfo users={players} />
          </Box>
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
      )}
    </>
  ;

  return (
    <>
      <Backdrop className={classes.backdrop} open={disabled}>
        <h2>Oops :( seems like you have another connection</h2>
      </Backdrop>
      {validWaitingRoom}
      
    </>
  );
}
