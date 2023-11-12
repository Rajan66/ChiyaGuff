import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@mui/material';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))
        }
        clear()
    }

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])

    const clear = () => {
        setCurrentId(null)
        setPostData({
            creator: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?'Editing':'Creating'} a Post</Typography>
                <TextField style={{ margin: 10 }} name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField style={{ margin: 10 }} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField style={{ margin: 10 }} name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField style={{ margin: 10 }} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase>
                </div>
                <Button style={{ marginBottom: 10 }} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="warning" size="medium" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form