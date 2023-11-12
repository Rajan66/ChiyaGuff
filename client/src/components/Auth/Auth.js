import React, { useState } from 'react'
import { Avatar, Button, Typography, Paper, Grid, Container, TextField } from '@mui/material';
import GoogleLogin

import LockOutLinedIcon from '@mui/icons-material/LockOutlined'
// import { useStyles } from './styles'
import Input from './Input';

const Auth = () => {
  // const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {

  }

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const switchMode = () => {
    // isSignUp ? setIsSignUp(false) : setIsSignUp(true)
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    handleShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  return (
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

                <Input name="firstName" label="First Name" onChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" onChange={handleChange} half />

              </>
            )}
            <Input name="email" label="Email Address" onChange={handleChange} type='email' />
            <Input name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? 'Already have an account? Sign in' : 'Dont have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth