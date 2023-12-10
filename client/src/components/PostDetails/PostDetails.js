import React, { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Divider, Stack, Avatar } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams, useNavigate } from "react-router-dom"

import "./styles.css"


import { getPost } from '../../actions/posts'
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const { id } = useParams()

  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    setIsLoading(true)
    dispatch(getPost(id))
    setIsLoading(false)
  }, [id])

  if (!post) {
    console.log("null")
    return null
  }

  if (isLoading) {
    return (
      <Stack style={{ marginTop: "400px", alignItems: "center" }}>
        <CircularProgress color="primary" size="100px" />
      </Stack>
    )
  }

  return (
    <>
      <Paper>
        <div style={{ marginTop: "90px", display: "flex", width: "100%" }}>
          <div style={{ borderRadius: " 20px", margin: "20px", padding: "8px",width:"70%" }}>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <Avatar alt={post.name}>{post?.name?.charAt(0)}</Avatar>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <Typography variant="body1" style={{ fontWeight: "bold", marginLeft: "10px" }}>{post.name}</Typography>
                <Typography variant="caption">{moment(post.createdAt).fromNow()}</Typography>
              </div>
            </div>

            <Typography variant="h6" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="caption" color="textSecondary" component="h2">{post.tags?.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="subtitle1" component="p" width="100%">{post.message}</Typography>




            <img
              style={{
                alignContent:"start"
              }}
              src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
              alt={post.title}
            />

          </div>



          <div style={{ display:"flex",borderRadius: " 20px", margin: "20px", padding: "8px" }}>
            <CommentSection post={post} />
          </div>



        </div>
      </Paper >

    </>
  )
};

export default PostDetails
