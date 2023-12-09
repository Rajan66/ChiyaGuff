import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'

import "./styles.css"

const CommentSection = ({ post }) => {
    const dispatch = useDispatch()
    const commentsRef = useRef()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className="commentsOuterContainer">
                <div className="commentsInnerContainer">
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            {c}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick} >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection