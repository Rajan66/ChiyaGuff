import React, { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Divider, Stack } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams, useNavigate } from "react-router-dom"

import "./styles.css"


import { getPost } from '../../actions/posts'

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const { id } = useParams()

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
    <Paper>
      <div className="card" style={{ marginTop: "100px" }}>
        <div className="section">
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags?.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className="imageSection">
          <img className="media" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
    </Paper>
  )
};

export default PostDetails
