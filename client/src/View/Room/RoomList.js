import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogoHeader from "../../Components/LogoHeader/";
import RoomSearchBar from "../../Components/Room/RoomSearchBar";
import RoomListTable from "../../Components/Room/RoomListTable";
import RoomAlert from "../../Components/Room/RoomAlert";
import UserProfileCard from "../../Components/UserProfile";
import Hidden from "@material-ui/core/Hidden";
import NavBar from "../../Components/NavBar/";
import { useHistory } from "react-router-dom";
import Loading from "../../Components/Loading";

// Context
import { UserContext } from "../../context/UserContext";
import { socket } from "../../service/socket";

const useStyle = makeStyles({
  button: {
    padding: "20px",
    width: "80px",
  },
});

export default function RoomList() {
  const classes = useStyle();

  const [isInRoom, setIsInRoom] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rooms, setRooms] = useState([]);

  // Fetch the data from the user context
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    socket.on("roomList", (rooms) => {
      if (rooms) {
        setRooms(rooms.reverse());
        setLoading(false);
      }
    });
    socket.on("updateRoomList", () => {
      socket.emit("broadcastRoom");
    })
    socket.emit("showRoomList");
    setLoading(true);
  }, []);

  return (
    <>
      <Container>
        <RoomAlert />
        <NavBar />
        <LogoHeader />
        <Box pt="30px">
          <RoomSearchBar />
        </Box>
        <Box pt="80px" ml="-20px">
          <Grid
            container
            direction="row-reverse"
            spacing={2}
            justify="start"
            alignItems="start"
          >
            <Grid item xs={12} sm={4} md={3}>
              <UserProfileCard user={user} />
            </Grid>
            <Grid item xs={12} sm={8} md={7}>
              {loading ? (
                <>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Loading />
                    <Typography style={{marginTop:'30px', fontSize:'20px'}}>Loading Rooms</Typography>
                  </Box>
                </>
              ) : (
                <RoomListTable rooms={rooms} />
              )}
            </Grid>
            <Grid item xs={0} sm={0} md={2}>
              &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
