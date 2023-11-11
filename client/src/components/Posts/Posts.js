import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import { CircularProgress,Grid  } from '@mui/material';

const Posts = ({currentId,setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    console.log(posts)
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} align="center">
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts