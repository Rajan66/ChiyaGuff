import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Autocomplete } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useNavigate, useLocation } from 'react-router-dom'
import Chip from '@mui/material/Chip'

import { useDispatch } from 'react-redux'
import useStyles from './styles'


import { getPosts, getPostsBySearch } from '../../actions/posts'


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const dispatch = useDispatch();

    const query = useQuery()
    const searchQuery = query.get('searchQuery')

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        dispatch(getPosts());

    }, [currentId, dispatch]);

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        // keycode 13 means enter key.
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyItems="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} style={{marginTop:"110px"}}>
                        <AppBar position='static' color='inherit' className={classes.appBarSearch}>
                            <TextField
                                name="search"
                                variant='outlined'
                                label="Search Memories"
                                fullWidth value={search}
                                onKeyUp={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Autocomplete
                                multiple
                                id="tags"
                                style={{ margin: '10px 0' }}
                                options={[]}
                                defaultValue={[]}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => {
                                        setTags(value);
                                        return (
                                            <Chip
                                                key={index}
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        );
                                    })
                                }
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Search Tags"
                                        placeholder='Search Tags (Press enter to add)'
                                    />
                                )}
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home