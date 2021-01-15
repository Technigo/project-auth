import React, { useState } from 'react'
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
  const [showPassword, setShowPassword] = useState(false)

  const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const accessToken = useSelector((store) => store.user.login.accessToken)

  const dispatch = useDispatch()

  // Form validation
  const minimumNameLength = { minLength: 2, maxLength: 20 }
  const minimumPasswordLength = { minLength: 5 }
  const validEmail = { pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" }
  //cannot start with @ and has to include the pattern of xxxx@xxx.se

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword)

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

  return (
    <Container>
      <Wrapper>
        {!accessToken ? (
          <Form onSubmit={(event) => event.preventDefault()}>
            <Title>Log in/Sign up</Title>
            <SubTitle>to reveal your secret message...</SubTitle>
            <TextField
              required id="standard-required"  //adds *
              label="Name"
              inputProps={minimumNameLength}
              value={name}
              onChange={(event) => setName(event.target.value)}
              helperText={name === "" ? 'min. 2 char' : ' '}
            />
            <div>
              <InputLabel htmlFor="standard-adornment-password">Password*</InputLabel>
              <Input
                required={true}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"} //changed when icon is clicked
                value={password}
                fullWidth={true}
                onChange={(event) => setPassword(event.target.value)}
                inputProps={minimumPasswordLength}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {/* toggles */}
                      {showPassword ? <Visibility /> : <VisibilityOff />}
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

