import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Grow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../Asset/img/reversi-logo-01.svg";
import "../../Asset/loading.css";

// Login Controller
import login from "../../controller/user/login";

const useStyle = makeStyles({
  inputForm: {
    width: "500px",
    padding: "40px",
  },
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyle();

  const isNewAccount = (message) => {
    return message === "Email Not Found";
  };

  const setupRegister = () => {
    window.localStorage.setItem("_account", username);
    window.localStorage.setItem("_password", password);
    window.location.href = `/register?email=${username}`;

  };

  const onClickStart = () => {
    setLoading(true);
    const loginRequest = async () => {
      const res = await login(username, password);
      if (res.data.token) {
        window.location.href = "/";
      } else {
        isNewAccount(res.data.message)
          ? setupRegister()
          : setTimeout(() => setError(res.data.message), 1000);
      }
      setTimeout(() => setLoading(false), 1000);
    };
    loginRequest();
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt="100px">
        <img src={Logo} style={{ height: "150px" }}></img>
      </Box>
      <Grow in={true}>
        <Box display="flex" justifyContent="center" mt="50px">
          <Paper elevation={3}>
            <Grid
              container
              direction="column"
              className={classes.inputForm}
              spacing={3}
            >
              <Grid item xs>
                <TextField
                  variant="outlined"
                  label="Your Email"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  label="Your Password"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              {error && (
                <Grid item xs>
                  <Typography
                    variant="body2"
                    style={{ color: "red" }}
                    align="right"
                  >
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs>
                {loading ? (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableRipple
                  >
                    <div style={{ padding: "11px" }}>
                      <div class="dot-windmill" />
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onClickStart}
                  >
                    Start
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grow>
      <Box display="flex" justifyContent="center" mt="50px">
        Server Status:{" "}
        <span style={{ color: "green", marginLeft: "10px" }}>Online 🟢 </span>
      </Box>
      <Box display="flex" justifyContent="center" mt="10px">
        Players <span style={{ color: "green", marginLeft: "10px" }}>536 </span>
      </Box>
    </Container>
  );
}
