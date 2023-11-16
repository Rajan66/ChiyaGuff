import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'


const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (

        <Grow in>
            <Container>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home