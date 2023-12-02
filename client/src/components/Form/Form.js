import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper, TextareaAutosize } from '@mui/material';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import moment from 'moment';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '',updatedAt:'' })
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleSubmit = (e) => {
        // if you uncomment this it wont refresh the page but show the changes ... is kinda slow tho
        // e.preventDefault() 
        if (currentId) {
            postData.updatedAt = moment.now()
        
            dispatch(updatePost(currentId, { ...postData, name: user?.result.name }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result.name }))
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
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    }


    if (!user?.result?.name) {
        return (
            <Paper>
                <Typography variant='h6' align='center'>
                    Please sign in to create your own memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <section>
            <Paper className={classes.paper} elevation={6}>

                <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>
                    <TextField style={{ margin: 10 }} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField style={{ margin: 10 }} name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField style={{ margin: 10 }} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase>
                    </div>
                    <Button style={{ marginBottom: 10 }} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="warning" size="medium" onClick={clear} fullWidth>Clear</Button>
                </form>

            </Paper>
        </section>
    )
}

export default Form