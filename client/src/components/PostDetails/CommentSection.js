import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import "./styles.css"

const CommentSection = ({ post }) => {
    console.log(post)
    const [comments, setComments] = useState([])

    return (
        <div>
            <div className="commentsOuterContainer">
                <div className="commentsInnerContainer">
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>Comment {i}</Typography>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CommentSection