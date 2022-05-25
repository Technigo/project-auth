import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import user from '../reducers/user'
import { API_URL } from '../utils/utils'

// const API_URL = 'https://auth-login-hanna-isabell.herokuapp.com/'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('register')
  const [error, setError] = useState('')

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }), //varför är våra inte "aktiverade" som det ser ut
    }
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUsername(null))
          })
          setError('Sorry, this is an invalid username or password')
        }
      })
  }

  return (
    <>
      <Link to='/'> LINK TO /</Link>
      <main className='main-container'>
        <form onSubmit={onFormSubmit} className='form-container'>
          <label htmlFor='username'>Login</label>
          <h3>Username:</h3>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <h3>Password:</h3>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className='submit-button'
            type='submit'
            value='Login'
            onClick={() => setMode('login')}
          >
            <p>Log in</p>
          </button>
          <button
            className='submit-button'
            type='submit'
            value='Sign up'
            onClick={() => setMode('signup')}
          >
            <p>Sign up</p>
          </button>
        </form>
      </main>
    </>
  )
}
