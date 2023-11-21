import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material'
import MessageIcon from '@mui/icons-material/Message'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux';


import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  console.log(user)
  // googleId is undefined.. instead we can use sub?
  console.log(user?.result?.googleId)
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like == (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <ThumbUpAlt fontSize='small' />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }
    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>
  }

  return (
    <div style={{ margin: 15 }}>
      <CardActions>
        <Typography>
          {post.name}
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
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </IconButton>
          <IconButton aria-label="share">
            <MessageIcon />
          </IconButton>
        </CardActions>
        <CardContent>
        </CardContent>
      </Card>
    </div>
  )
}

export default Post