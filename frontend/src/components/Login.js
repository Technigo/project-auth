import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import user from '../reducers/user'
import { API_URL } from '../utils/utils'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('registration')
  const [error, setError] = useState('')
  // const [testToken, setTestToken] = useState(null)

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/main')
    }
  }, [accessToken])

  useEffect(() => {
    console.log(accessToken)
  }, [])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response)
          // setTestToken(data.accessToken)
          batch(() => {
            const userId = data.userId
            const accessToken = data.accessToken
            const username = data.username
            console.log(userId, accessToken, username)
            dispatch(user.actions.setUserId(userId))
            dispatch(user.actions.setAccessToken(accessToken))
            dispatch(user.actions.setUsername(username))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUsername(null))
          })
          // setError('Sorry, this is an invalid username or password')
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
            placeholder='enter username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <h3>Password:</h3>
          <input
            type='password'
            id='password'
            placeholder='enter password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className='submit-button'
            type='submit'
            id='login'
            onClick={() => setMode('login')}
          >
            <p>Log in</p>
          </button>
          <button
            className='submit-button'
            type='submit'
            id='registration'
            onClick={() => setMode('registration')}
          >
            <p>Sign up</p>
          </button>
          <p className='error'>{error}</p>
        </form>
      </main>
    </>
  )
}
