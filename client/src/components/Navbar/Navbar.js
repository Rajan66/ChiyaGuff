import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import logo from '../../images/tea.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { ReactComponent as Hamburger } from '../../images/hamburger.svg'
import './styles.css'

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

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                ChiyaGuff
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>

                    {user ? (<div className="parent">
                        <li>
                            <div className="child">
                                {!isNavExpanded ?
                                    (<Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>) :
                                    (<div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                                        <Typography>{user.result.name}</Typography>
                                    </div>)}
                            </div>
                        </li>
                        <li>
                            <div className="child">
                                <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                            </div>
                        </li>
                    </div>) : (
                        <li>
                            <div className="child">
                                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                            </div>
                        </li>
                    )}
                </ul>
            </div >
        </nav >
    );

    // return (
    //     <section id="home">
    //         <AppBar className="appBar" style={{ flexDirection: "row", justifyContent: "space-between" }} color="inherit">

    //             <div className="brandContainer">
    //                 <img className="image" src={logo} alt="icon" height="60" />
    //                 <Typography component={Link} to="/posts" className="heading" variant="h3">ChiyaGuff</Typography>
    //             </div>


    //             <Toolbar className="toolbar"  >
    //                 {user ? (<div classes="profile" style={{ display: 'flex', justifyContent: "space-between" }}>
    //                     <div>
    //                         <Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
    //                     </div>
    //                     {/* <Typography className="username" variant='h6'>{user.result.name}</Typography> */}

    //                     <Button variant='contained' style={{ marginLeft: "20px" }} color='secondary' onClick={logout}>Logout</Button>
    //                 </div>) : (
    //                     <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
    //                 )}
    //             </Toolbar>
    //         </AppBar>
    //     </section >
    // )
}

export default Navbar