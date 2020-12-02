import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar, Grid } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import CountUp from "react-countup";
// Context
import { UserContext } from "../../../context/UserContext";
import { GameContext } from "../../../context/GameContext";

import { useHistory } from "react-router-dom";
// Socket
import { socket } from "../../../service/socket";

const useStyle = makeStyles({
  avatarLeft: {
    width: "100px",
    height: "80px",
  },
  avatarRight: {
    width: "100px",
    height: "80px",
  },
  badge: {
    marginRight: "40px",
  },
});

export default function GameEndDialog() {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const classes = useStyle();

  const { user } = useContext(UserContext);
  const { room, game, players, gameResult } = useContext(GameContext);

  //   useEffect(() => {
  //     setOpen(Boolean(user.currentRoom));
  //   }, [user])

  return (
    <div>
      <Dialog
        open={open}
        // onClose={}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        {/* <DialogTitle id="alert-dialog-title">
          Game End
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2 style={{ textAlign: "center" }}>
              {user && gameResult && (
                <>
                  {user._id === gameResult.winnerId ? (
                    <>Congratulations! You Win{":)"}</>
                  ) : (
                    <>You Lose {":("}</>
                  )}
                </>
              )}
            </h2>
            <Box display="flex" justifyContent="center" padding="50px">
              {players.map((e) => {
                return (
                  <>
                    {user._id !== gameResult.winnerId ? (
                      <>
                        <Box display="flex" flexDirection="column">
                          <Avatar className={classes.avatarLeft} src={e.avatar}>
                            H
                          </Avatar>
                          <Badge
                            className={classes.badge}
                            badgeContent={"Winner"}
                            overlap="circle"
                            color="primary"
                          ></Badge>
                          <Box display="flex" justifyContent="center" mt="10px">
                            <p>{e.name}</p>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box display="flex" flexDirection="column">
                          <Avatar
                            className={classes.avatarRight}
                            src={e.avatar}
                          >
                            H
                          </Avatar>
                          <Box display="flex" justifyContent="center">
                            <p>{e.name}</p>
                          </Box>
                        </Box>
                      </>
                    )}
                  </>
                );
              })}
            </Box>
            <p>
              <Box textAlign="center">Score you have earned</Box>
              <Box textAlign="center">
                <strong
                  style={{
                    color: "#7C4DFF",
                    marginLeft: "10px",
                    fontSize: "40px",
                  }}
                >
                  <CountUp
                    duration={2}
                    end={
                      user._id === gameResult.winnerId
                        ? parseInt(gameResult.scoreEarn)
                        : 0
                    }
                  />
                </strong>{" "}
              </Box>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1} direction="column">
            <Grid item xs>
              <Button color="primary" variant="contained" fullWidth>
                Back to Room
              </Button>
            </Grid>
            <Grid item xs>
              <Button color="secondary" variant="contained" fullWidth>
                Exit
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
