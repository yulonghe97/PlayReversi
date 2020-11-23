import React from 'react'
import { Paper, Grid, Avatar, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import AvatarPsedo from "../../Asset/img/avatar.jpg";


const useStyles = makeStyles({
    container:{
        padding:'30px',
        marginLeft:'13px'
    },
    avatar:{
        height:'100px',
        width:'100px'
    }
})

export default function UserProfileCard() {


    const classes = useStyles()

    return (
        <>
            <Paper elevation={2} className={classes.container}>
                <Grid container justify="center" alignContent="center" alignItems="center"  spacing={2} direction="column" >
                    <Grid item xs>
                        <Avatar src={AvatarPsedo} className={classes.avatar} />
                    </Grid>
                    <Grid item xs>
                        <Box><Typography variant="h5" color="primary">Yulong</Typography></Box>
                    </Grid>
                    <Grid item xs>
                        <Box><Typography variant="body2">Score: 3,206</Typography></Box>
                    </Grid>
                    <Grid item xs>
                        <Box><Typography variant="body2">Matches: 100</Typography></Box>
                    </Grid>
                    <Grid item xs>
                        <Box><Typography variant="body2">School: NYU</Typography></Box>
                    </Grid>
                    
                </Grid>
            </Paper>
        </>
    )
}
