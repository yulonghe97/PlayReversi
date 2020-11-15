import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    // <div className={classes.root}>
    //   <AppBar position="static" color="transparent" style={{ margin: 0 }}>
    //     <Toolbar>
    //       <Typography variant="h6" className={classes.title}>
    //         PlayReversi
    //       </Typography>
    //       <Button color="inherit">Hi, Yulong</Button>
    //     </Toolbar>
    //   </AppBar>
    // </div>
    <>
      <Box display="flex" justifyContent="space-between" padding="20px">
        <Typography variant="h6" className={classes.title}>
          <SportsEsportsIcon style={{marginRight:"10px"}} />PlayReversi.io
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Hi Yulong
        </Typography>
      </Box>
    </>
  );
}
