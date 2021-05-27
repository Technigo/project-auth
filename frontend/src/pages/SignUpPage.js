import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Container = styled.div`
  background-image: url('/assets/sign-up-background-image.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// const Heading = styled.h1`
//   color: #6d6875;
//   font-size: 46px;
// `

const SignUpPage = () => {
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

  const onFormSubmit = (e) => { // Can be moved to be a thunk in the reducer
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
      .catch()
  }

  return (
    <Container>
      <form onSubmit={onFormSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" onClick={() => setMode('signup')}>SIGN UP</button>
      </form>
    </Container>
  )
}

export default SignUpPage