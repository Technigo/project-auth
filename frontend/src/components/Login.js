import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch} from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import user from '../reducers/user'
import { API_URL } from '../reuseables/urls'
import { MainContainer, Header, Form, InputWrapper, Label, InputField, Text, SecondaryButtonContainer, PrimaryButton, SecondaryButton, ErrorMessage } from './styled-components/form-style'

const Login = () => {                     
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const error = useSelector(store => store.user.errors)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken){
      history.push('/secret')
    }
  },[accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) //add email later
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
        Who's our secret VIP?
        </Header>
        <InputWrapper>
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
        </InputWrapper>
         {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <PrimaryButton
          type='submit'
          onClick={() => setMode('login')}
        >
          Login
        </PrimaryButton>
        <SecondaryButtonContainer>
          <Text>Register as a VIP? </Text>
          <Link to="/register">
            <SecondaryButton>
              Register
            </SecondaryButton>
          </Link>
        </SecondaryButtonContainer>
      </Form>
    </MainContainer>
  )
}

export default Login