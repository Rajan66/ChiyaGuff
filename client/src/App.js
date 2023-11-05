import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import logo from './images/koala.png'
import useStyles from './styles';

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";

const App = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appbar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">SocialSphere</Typography>
                <img className={classes.img} src={logo} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container >
    )
}
export default App