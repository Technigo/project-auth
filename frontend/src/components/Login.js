import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/urls'
import user from '../reducers/user'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signup')
  const [validationError, setValidationError] = useState(null)
  const [isUnavailable, setIsUnavailable] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // if we have accesstoken navigate to the Main
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    // if the service is unavailable navigate to NotFound
    if (isUnavailable) {
      navigate('*')
      setIsUnavailable(false)
    }
  }, [isUnavailable, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // optimize with batch
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            // wipe out the prev. errors
            dispatch(user.actions.setError(null))
            // useState to remove error message
            setValidationError(null)
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
            // useState to store the error message and display it
            setValidationError(data.message)
          })
        }
      })
      .catch(() => setIsUnavailable(true))
  }

  //   console.log('validationError: ', validationError)

  return (
    <section className='login-section'>
      <>
        <h1>Sign up or Log in</h1>
        <div className='radio-container'>
          <label htmlFor='signup'>Sign up</label>
          <input
            id='signup'
            type='radio'
            checked={mode === 'signup'}
            onChange={() => setMode('signup')}
          />
          <label htmlFor='login'>Log in</label>
          <input
            id='login'
            type='radio'
            checked={mode === 'login'}
            onChange={() => setMode('login')}
          />
        </div>
        <form onSubmit={onFormSubmit}>
          <div className='input-field'>
            <label htmlFor='username'>
              Username <span className='required'>&#42;</span>
            </label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>
              Password <span className='required'>&#42;</span>
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* if we have error -> display it */}
          {validationError !== null && (
            <p className='error-message'>{validationError}</p>
          )}
          <button type='submit'>Submit</button>
        </form>
      </>
    </section>
  )
}

export default Login
