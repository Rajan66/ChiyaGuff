import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Autocomplete } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useNavigate, useLocation } from 'react-router-dom'
import Chip from '@mui/material/Chip'

import { useDispatch } from 'react-redux'
import useStyles from './styles'
import Pagination from '../Pagination/Pagination'
import { getPostsBySearch } from '../../actions/posts'


function useQuery() {
    return new URLSearchParams(useLocation.search)
}

const Home = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const dispatch = useDispatch();

    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [currentId, setCurrentId] = useState(null);


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

    // const handleClick = (tag) => setTags([...tags, tag])
    // const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    return (

        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="center" >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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
                                        console.log(tags)
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
                        <Paper elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home