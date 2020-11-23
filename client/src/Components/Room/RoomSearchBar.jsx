import React from 'react'
import { Grid, Box, OutlinedInput, ButtonGroup, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"; 

const useStyle = makeStyles({
    button: {
      padding: "20px",
      width: "80px",
    },
  });

export default function RoomSearchBar() {

   const classes = useStyle(); 
    return (
        <>
          <Grid
            container
            direction="row"
            spacing={3}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={0} sm={2}>
              &nbsp;
            </Grid>
            <Grid item xs={8} sm={7}>
              <Box display="flex" justifyContent="center">
                <OutlinedInput
                  fullWidth
                  placeholder="Room Code"
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontSize: "30px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={4} sm={3}>
              <ButtonGroup disableRipple>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Join
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Create
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </>
    )
}
