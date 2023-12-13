import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'

import "./styles.css"

const CommentSection = ({ post }) => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState('')


    useEffect(() => {
        setComments(post?.comments)

    }, comments)

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')


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
                </div>
                <div>
                    {user?.result?.name && (
                        <div style={{ width: '100%' }}>
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
        </div>
    )
}

export default CommentSection