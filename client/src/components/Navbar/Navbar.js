import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import useStyles from './styles'
import logo from '../../images/koala.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';



const Navbar = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.result;
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        setUser(null)
    }

    return (
        <AppBar className={classes.appbar} position="static" style={{ flexDirection: "row" }} color="inherit">
            <div classes={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align='left'>SocialSphere</Typography>
                <img className={classes.image} src={logo} alt="memories" height="60" align='right' />
            </div>
            <Toolbar className={classes.toolbar} >
                {user ? (<div classes={classes.profile}>
                    <Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.username} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar