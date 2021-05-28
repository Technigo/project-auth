import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

import SignInForm from '../components/SignInForm'

const Container = styled.div`
  background-image: url('/assets/sign-in-background-image.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Heading = styled.h1`
  color: #6d6875;
  font-size: 46px;
`

const SignInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    // redirect user to '/' path if user has accessToken
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL(mode), options)
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
  }
  
  return (
    <Container>
      <Heading>Welcome to the most amazing page ever if you love to travel!</Heading>
      <SignInForm 
        onFormSubmit={handleFormSubmit}
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        setMode={setMode}
      />
    </Container>
  )
}

export default SignInPage