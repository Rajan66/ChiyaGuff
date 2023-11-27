import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useNavigate, useLocation } from 'react-router-dom'
// import ChipInput from 'material-ui-chip-input';

import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
// import useStyles from './styles'

import Pagination from '../Pagination/Pagination'


function useQuery() {
    return new URLSearchParams(useLocation.search)
}

const Home = () => {
    // const classes = useStyles()
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    const navigate = useNavigate()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (

        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="center" >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar  position='static' color='inherit'>
                            <TextField name="search" variant='outlined' label="Search Memories" fullWidth value="TEST" onChange={() => { }} />
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home