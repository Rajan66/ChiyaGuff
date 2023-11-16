import React from "react";
import { Container } from '@mui/material';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {

    return (
        <Router>
            <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/auth" Component={Auth}/>
                </Routes>
         
            </Container >
        </Router>
    )
}
export default App