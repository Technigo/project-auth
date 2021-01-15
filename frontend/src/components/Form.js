/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { user } from '../reducers/user'
import { Button } from '../lib/Button'
import { Input } from '../lib/Input'
// import Secrets from './Secrets'

const SIGNUP_URL = 'http://localhost:8081/users'
const LOGIN_URL = 'http://localhost:8081/sessions'

const FormStyle = styled.form`
  display: flex;
  flex-flow: column nowrap;
`
const Title = styled.h1`
  font-size: 55px;
  color: #85ad99;
`
// to either LOGIN or REGISTER as a new user
// need error msg when login fails
export const Form = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    )
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }))
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success' }))
  }

  const handleLoginFail = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Login failed'
        }
        return res.json()
      })
      .then((json) => handleLoginSuccess(json)) // to be implemented
      .catch((err) => handleLoginFail(err)) // to be implemented
  }

  if (accessToken) {
    return <Secrets />
  }

  return (
    // conditionally render 
      <FormStyle>
        <Title>Login</Title>
        
          <Input
            type="text"
            value={email}
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
            required />
        
          <Input
            type="text"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            required />
        
        <Button
          type="submit"
          background="green"
          onClick={handleLogin} >
            login
        </Button>
        
        <p>Not registered yet? Sign up here!</p>  
        {/* make this a link */}
      </FormStyle>
  )
}