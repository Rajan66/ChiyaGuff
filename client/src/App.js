import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import logo from './images/koala.png';


import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts'
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <Navbar />
            {/* <AppBar className={classes.appbar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">SocialSphere</Typography>
                <img className={classes.img} src={logo} alt="memories" height="60" />
            </AppBar> */}
            <Grow in>
                <Container>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={6} >
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