import React, { useState } from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button, ButtonBase } from '@mui/material';
import { ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { deletePost, likePost } from '../../../actions/posts'
import { HashLink as Link } from 'react-router-hash-link'

import { useNavigate } from 'react-router-dom';

import "./styles.css"

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [likes, setLikes] = useState(post?.likes)


  const openPost = () => navigate(`/posts/${post._id}`)

  const userId = user?.result?.sub || user?.result?._id
  const hasLikedPost = post.likes.find((like) => like === (userId))

  const handleLike = async () => {
    dispatch(likePost(post._id))
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== (userId)))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (userId)) ? (
        <>
          <ThumbUpAlt fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }
    return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>
  }

  return (

    <Card raised elevation={6} className="card" style={{ width: "100%" }}>

      <CardMedia className="media"
        image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        title={post.title}
        onClick={openPost} />

      <div className="overlay">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      <div className="overlay2">
        <Link to="#home" smooth>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <Button style={{ color: 'white' }} size="small" onClick={() => {
              setCurrentId(post._id)
            }}><MoreHorizIcon fontSize="default" /></Button>
          )}
        </Link>
      </div>

      <div className="details">
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>

      <div className="content">
        <Typography className="title" gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </div>
      <CardActions className="cardActions">

        <Button size="small" color="primary" onClick={handleLike}>
          <Likes />
        </Button>

        {((user?.result?.sub === post?.creator) || (user?.result?._id === post?.creator)) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>

    </Card>

  )
}

export default Post

