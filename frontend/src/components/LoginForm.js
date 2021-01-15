import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { user } from '../reducers/user'
import { Profile } from './Profile'

const LOGIN_URL = 'https://project-auth-cla-ellen.herokuapp.com/sessions'
const SIGNUP_URL = 'https://project-auth-cla-ellen.herokuapp.com/users'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const statusMessage = useSelector((store) => store.user.login.statusMessage)
      
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
      
  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    )
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }))
    dispatch(
      user.actions.setStatusMessage({ statusMessage: 'Login success!' })
    )
  }
      
  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }
      
  const handleSignup = (event) => {
    event.preventDefault();
          
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Sign up failed')
        }
          return res.json()
      })
        .then((json) => handleLoginSuccess(json))
        .catch((err) => handleLoginFailed(err));
  }
      
  const handleLogin = (event) => {
    event.preventDefault()
      
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed. Please try to login again')
        }
          return res.json()
      })
        .then((json) => handleLoginSuccess(json))
        .catch((err) => handleLoginFailed(err))
  }
      
  if (accessToken) {
    return (
        <Profile />
    )
  }
      
  return (
    <FormContainer>
      <Form>
        <h1>Sign Up</h1>
        <InputLabel>
          Name:
          <InputField
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </InputLabel>
        <InputLabel>
          Password:
          <InputField
            required
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputLabel>
        <SubmitButton type="submit" onClick={handleSignup}>
          SIGN UP
        </SubmitButton>
        <SubmitButton type="submit" onClick={handleLogin}>
          LOGIN
        </SubmitButton>
        {statusMessage && 
          <p>Status Message:{`${statusMessage}`}</p>
        }
      </Form>
    </FormContainer>
  )
}

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 10px 30px 30px 30px;
  border-radius: 10%;
  border: 2px solid black;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InputLabel = styled.label`
  margin-bottom: 10px;
`

const InputField = styled.input`
  border-radius: 5px;
  margin-left: 5px;
`

const SubmitButton = styled.button`
  border-radius: 10px;
  background: black;
  color: white;
  cursor: pointer;
  padding: 3px;
  margin-bottom: 10px;
`