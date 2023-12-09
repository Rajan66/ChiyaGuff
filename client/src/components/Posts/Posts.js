import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { CircularProgress, Grid, Stack } from '@mui/material';
import "./styles.css"


const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);


    return (
        !posts.length ? (
            <Stack style={{ marginTop: "400px", alignItems: "center" }}>
                <CircularProgress color="primary" size="100px" />
            </Stack >
        ) : (
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