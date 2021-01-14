import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { login, signUp } from '../reducers/user'
import { CustomButton } from './CustomButton'
import { Profile } from './Profile'
import {
  Container,
  Wrapper,
  Form,
  ButtonWrapper,
  Title,
  SubTitle
} from '../styles/Style'

export const Login = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userName = useSelector((store) => store.user.login.userName)

  const dispatch = useDispatch()

  // Form validation
  const minimumNameLength = { minLength: 2, maxLength: 20 }
  const minimumPasswordLength = { minLength: 5 }
  const validEmail = { pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"} 
  //cannot start with @
  // has to include the pattern of xxxx@xxx.se

  // To be able to see userName when signing up
  // useEffect(() => {
  //   if (userName) {
  //     dispatch(signUp())
  //   }
  // }, [dispatch, userName])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(name, email, password))
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    dispatch(signUp(name, email, password))
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword })
  }

  return (
    <Container>
      <Wrapper>
        {!accessToken ? (
          <Form onSubmit={(event) => event.preventDefault()}>
            <Title>Log in/Sign up</Title>
            <TextField
              required id="standard-required"  //adds *
              label="Name"
              inputProps={minimumNameLength}
              value={name}
              error={name === "" ? false : name === 1 ? true : false } //does not work
              onChange={(event) => setName(event.target.value)}
              helperText={name === "" ? 'Min. 2 char' : ' '}
            />
            <div>
            <InputLabel htmlFor="standard-adornment-password">Password*</InputLabel>
            <Input
              required={true}
              id="standard-adornment-password"
              type={password.showPassword ? 'text' : 'password'}
              value={password.password}
              fullWidth={true}
              onChange={(event) => setPassword(event.target.value)}
              inputProps={minimumPasswordLength}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {password.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            </div>
            
            <TextField
              required id="standard-default"  //adds *
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              inputProps={validEmail}
              helperText={email === "" ? 'x@xxx.xx' : ' '}
            /> 
  
            <ButtonWrapper>
              <CustomButton
                variant="contained"
                color="default"
                size="large"
                type='submit'
                onClick={handleSignUp}
                text='Sign up'
                disabled={!name || !password || !email}
              />
              <CustomButton
                variant="contained"
                color="primary"
                size="large"
                type='submit'
                onClick={handleLogin}
                text='Log in'
                disabled={!name || !password || !email}
              />
            </ButtonWrapper>
            {errorMessage && <SubTitle>{errorMessage}</SubTitle>}
          </Form>
        ) : (
            <Profile />
          )}
      </Wrapper>
    </Container>
  )
}

