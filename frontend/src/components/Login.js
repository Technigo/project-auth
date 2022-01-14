import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import styled from 'styled-components/macro'

import { API_URL } from '../utils/urls'

import user from '../reducers/user'

export const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // property of the mode will be sign up or sign in
  const [mode, setMode] = useState('signup')

  const accessToken = useSelector(store => store.user.accessToken)
  const error = useSelector(store => store.user.error)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    // post request to backend to sign up(create user)
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        // setting info from backend to redux store
      if(data.success) {
        // batch function combines multiple dispatches, improves loading time 
        batch(() => {
          // if user is saved to the database, then we save it to the reduxstore
          dispatch(user.actions.setUserId(data.response.userId))
          dispatch(user.actions.setUsername(data.response.username))
          dispatch(user.actions.setAccessToken(data.response.accessToken))
          // cleaning all of the erros that were before
          dispatch(user.actions.setError(null))
        })
      } else {
        batch(() => {
          // cleaning store (defensive approach)
          dispatch(user.actions.setUserId(null))
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setAccessToken(null))
          // saving error msg from database to the redux store 
          dispatch(user.actions.setError(data.response))
        })
      }
    })
  }

  return (
    <> 
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={onFormSubmit}>
      <div style={{display: 'flex'}} className="toggle">
        {/*<label htmlFor='signup' className="label">Sign up</label>*/}
        <input id="signup" type="radio" checked={mode === 'signup'} onChange={() => setMode('signup')} />
        {/*<label htmlFor='signin'>Sign in</label>*/}
        <input id="signin" type="radio" checked={mode === 'signin'} onChange={() => setMode('signin')} />
      </div>
        <h3>{mode === 'signup' ? 'SIGN UP' : 'LOG IN'}</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter your email" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && 
          <div>
            <p className="error-text">{error}</p>
          </div>
        }
        <button>{mode === 'signup' ? 'Submit' : 'Log in'}</button>
      </form>
    </>
  )
}

