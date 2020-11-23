import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

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

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
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
              <Typography variant="h5">Akadia vs. Francis</Typography>
            </>
          }
          secondary={
            <React.Fragment>
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
            </React.Fragment>
          }
        />
        <Box mt="30px">
          <Typography>Join</Typography>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" className={classes.divider} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarGroup max={3} style={{ marginRight: "20px" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </AvatarGroup>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="h5">Alicia</Typography>
            </>
          }
          secondary={
            <React.Fragment>
              <Typography
              >
                <Chip
                  className={classes.status}
                  label="# KTSJ3"
                  variant="outlined"
                />
                <Chip
                  className={classes.status}
                  style={{ color: "#ff7c4d", borderColor: "#ff7c4d" }}
                  label="Waiting"
                  variant="outlined"
                />
              </Typography>
            </React.Fragment>
          }
        />
        <Box mt="30px">
          <Typography>Join</Typography>
        </Box>
      </ListItem>
    </List>
  );
}
