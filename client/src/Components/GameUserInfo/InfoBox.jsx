import React from "react";
import { Grid, Box, Avatar, Typography, Divider } from "@material-ui/core";
import avatarImg from "../../Asset/img/avatar.jpg";


export default function InfoBox(props) {
    return (
        <Box
        padding="20px"
        paddingTop="30px"
        paddingLeft="20px"
        border="solid 2px #D8CECE"
        width="230px"
        height="100px"
        borderRadius="10px"
        marginBottom="10px"
      >
        <Grid container direction="row" spacing={2}>
          <Grid xs={3}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar src={props.avatar}>H</Avatar>
              {/* <div style={{ fontSize: "18px", paddingTop: "15px" }}>⚫</div> */}
            </Box>
          </Grid>
          <Grid xs={9}>
            <Box display="flex" flexDirection="column" marginLeft="10px">
              <Box pb="5px" style={{ fontSize: "16px", fontWeight: "600px" }}>
                {props.name}
              </Box>
              <Box paddingBottom="10px">NYU</Box>
              <Divider />
              <Box paddingTop="10px">Score: {props.score}</Box>
              <Box paddingTop="5px">Win: {props.matches}</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
}
