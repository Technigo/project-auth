import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch} from 'react-redux'
import { Link } from 'react-router-dom'

import user from '../reducers/user'
import Login from '../components/Login'
import { API_URL } from '../reuseables/urls'
import { MainContainer, Header, Form, Label, InputField, Text, SecondaryButtonContainer, PrimaryButton, SecondaryButton, ErrorMessage } from './styled-components/login-style'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const error = useSelector(store => store.user.errors)

  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) 
    }
  fetch (API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
    }

  return (
    <MainContainer>
    <Form onSubmit={onFormSubmit}>
      <Header>
        Welcome, please register here
      </Header>
      <Label htmlFor="username">Username:</Label> 
        <InputField
          id='username'
          type='text' 
          minLength= "2"
          maxLength= "20"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <Label htmlFor="password">Password:</Label> 
        <InputField
          id='password'
          type='password'
          minLength= "8"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
       {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <PrimaryButton
        className='primary-button'
        type='submit'
        onClick={() => setMode('register')}
      >
        Register
      </PrimaryButton>
      <Link to="/login">      
        Back to Login
      </Link>
    </Form>
  </MainContainer>
  )
}

export default Register