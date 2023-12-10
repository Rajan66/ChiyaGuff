import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import logo from '../../images/tea.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';


const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        setUser(null)
    }

    return (
        <section id="home">
            <AppBar className="appBar" style={{ flexDirection: "row", justifyContent: "space-between" }} color="inherit">
                <div className="brandContainer">
                    <img className="image" src={logo} alt="icon" height="60" />
                    <Typography component={Link} to="/posts" className="heading" variant="h3">ChiyaGuff</Typography>

                </div>

                <Toolbar className="toolbar" >
                    {user ? (<div classes="profile" style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div>
                            <Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        </div>
                        {/* <Typography className="username" variant='h6'>{user.result.name}</Typography> */}

                        <Button variant='contained' style={{ marginLeft: "20px" }} color='secondary' onClick={logout}>Logout</Button>
                    </div>) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    )}
                </Toolbar>

            </AppBar>
        </section >
    )
}

export default Navbar