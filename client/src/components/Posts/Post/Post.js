import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import MoreHorizon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux';


import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()

  return (
    <div style={{ margin: 15 }}>
      <CardActions>
        <Typography>
          {post.creator}
        </Typography>
        <IconButton onClick={() => setCurrentId(post._id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia className="Post-image"
          component="img"
          height="200"
          width="100%"
          image={post.selectedFile}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" component="p" color="text.secondary">
            {post.message}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {post.tags}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => dispatch(likePost(post._id))}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <MessageIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography align='left' variant='body2' color="text.secondary">
            Liked by {post.likeCount}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Post