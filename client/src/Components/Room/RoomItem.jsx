import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  AvatarGroup,
  Avatar,
  Typography,
  Chip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    divider: {
      marginLeft: "115px",
    },
    status: {
      marginTop: "10px",
      marginRight: "10px",
    },
  }));

export default function RoomItem() {


    const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarGroup max={3} style={{ marginRight: "20px" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </AvatarGroup>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <span  className="focus-in-expand">Akadias vs. Francis</span>
            </>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <Chip
                  className={classes.status}
                  label="# RMSKD"
                  variant="outlined"
                />
                <Chip
                  className={classes.status}
                  color="primary"
                  label="Ongoing"
                  variant="outlined"
                />
                <Chip
                  className={classes.status}
                  label="Full"
                  variant="outlined"
                />
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
}
