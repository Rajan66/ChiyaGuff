import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { CircularProgress, Grid } from '@mui/material';
import "./styles.css"


const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);


    console.log(posts)
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className="mainContainer">
                {posts.map((post) => (
                    <Grid className="actionDiv" key={post._id} item >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts