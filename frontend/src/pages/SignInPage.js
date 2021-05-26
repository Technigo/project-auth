import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components/macro'


import user from '../reducers/user'

import { API_URL } from '../reusable/urls'


const Form = styled.form`

`

// const Heading = styled.h1`

// `

const InputUsername = styled.input`

`

const InputPassword = styled.input`

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
    <>
      <Form onSubmit={onFormSubmit}>
        <InputUsername 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputPassword 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" onClick={() => setMode('signin')}>SIGN IN</button>
        <p>
          Not a user? 
          <Link to="/signup">Register here</Link> 
        </p>
      </Form>
    </>
  )
}

export default SignInPage