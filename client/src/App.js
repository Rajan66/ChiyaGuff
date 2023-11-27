import React from "react";
import { Container } from '@mui/material';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" Component={() => <Navigate to="/posts" />} />
                    <Route path="/posts" Component={Home} />
                    <Route path="/posts/search" Component={Home} />
                    <Route path="/posts/:id" Component={PostDetails} />
                    <Route path="/auth" Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)} />
                </Routes>

            </Container >
        </Router>
    )
}
export default App