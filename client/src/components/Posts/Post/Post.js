import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import MessageIcon from '@mui/icons-material/Message'
import koala from '../../../images/koala.png'
// import useStyles from './styles'; 

const Post = () => {
  // const classes = useStyles();
  return (
    <div style={{ padding: 15 }}>
      <Card sx={{ maxWidth: 345 }}>

        <CardMedia
          component="img"
          height="194"
          image={koala}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            #cool koala 
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <MessageIcon />
          </IconButton>

        </CardActions>

      </Card>
    </div>
  )
}

export default Post