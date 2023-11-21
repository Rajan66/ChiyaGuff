import React, { useState } from 'react'
import { Avatar, Button, Typography, Paper, Grid, Container } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import LockOutLinedIcon from '@mui/icons-material/LockOutlined'
// import { useStyles } from './styles'
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

import { signin, signup } from '../../actions/auth'

const Auth = () => {
  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', }
  // const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
    console.log(formData)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    // isSignUp ? setIsSignUp(false) : setIsSignUp(true)
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    setShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const googleSuccess = (res) => {
    const result = jwtDecode(res?.credential)
    try {
      dispatch({ type: 'AUTH', data: { result } });
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Google Sign In was unsuccessful. Try again later!')
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Avatar>
            <LockOutLinedIcon />
          </Avatar>
          <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>

                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type='email' />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? 'Already have an account? Sign in' : 'Dont have an account? Sign Up'}
                </Button>

                <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} cookiePolicy="single_host_origin" />

              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>

  )
}

export default Auth