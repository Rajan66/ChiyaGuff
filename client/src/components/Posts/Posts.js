import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import { CircularProgress, Grid } from '@mui/material';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts)
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} align="center">
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={2} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts