import React, { useEffect } from "react";
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

import { useCookies } from "react-cookie";

// Controllers
import getUserInfoController from "../../controller/user/getInfo";
import { get } from "http";

const useStyle = makeStyles({
  button: {
    padding: "20px",
    width: "80px",
  },
});

export default function RoomList() {
  const classes = useStyle();

  const [cookies, setCookie] = useCookies(['_userId']);

  useEffect(() => {

    async function getUserInfo(){
        const res = await getUserInfoController(cookies._userId);
        console.log(res);
    }
    getUserInfo();

  }, [])

  return (
    <>
      <Container>
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
              <UserProfileCard />
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
