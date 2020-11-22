import React from "react";
import { Grid, Box, Avatar, Typography, Divider } from "@material-ui/core";
import avatarImg from "../../Asset/img/avatar.jpg";
import InfoBox from "./InfoBox";

export default function GameUserInfo(props) {
  return (
   <>
      <Box display="flex" flexDirection="column" paddingTop="100px">
          {props.users.map((e) => {
            return <InfoBox username={e.username} />
          })}
      </Box>
   </>
  );
}
