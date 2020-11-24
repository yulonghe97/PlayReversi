import React, { useEffect, useContext } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogoHeader from "../../Components/LogoHeader/";
import RoomSearchBar from "../../Components/Room/RoomSearchBar";
import RoomListTable from "../../Components/Room/RoomListTable";
import UserProfileCard from "../../Components/UserProfile";
import Hidden from "@material-ui/core/Hidden";
import NavBar from "../../Components/NavBar/";

// Context 
import { UserContext } from "../../context/UserContext";


const useStyle = makeStyles({
  button: {
    padding: "20px",
    width: "80px",
  },
});

export default function RoomList() {
  const classes = useStyle();

  // Fetch the data from the user context
  const { user } = useContext(UserContext);

  useEffect(() => {

    console.log(user);

  }, [])

  return (
    <>
      <Container>
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
              <RoomListTable />
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
