import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user } from '../reducers/user'

const SIGNUP_URL = 'https://project-auth-lili-destiny-1.herokuapp.com/users'
const LOGIN_URL = 'https://project-auth-lili-destiny-1.herokuapp.com/sessions'

export const Form = () => {
  const dispatch = useDispatch()

  const accessToken = useSelector((store) => store.user.login.accessToken)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    )
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }))
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success' })
    )
    setName('')
    setPassword('')
  }

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }

  const handleSignup = (event) => {
    event.preventDefault()
    
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Signup Failed')
        }
        return response.json()
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login Failed')
        }
        return response.json()
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
  }

  const handleLogout = (loggingout) => { 
    dispatch(user.actions.logout({ logout: loggingout }))
    window.location.reload()
  }
  
  if(accessToken) {
    return <>
    <h2>{`Hello ${name} you are logged in!`}</h2>
    <button className='logout-button' type='submit' onClick={handleLogout}>
      Logout
    </button>
    </>
  }

  return (
    <section className='login-form'>
      <form className='form'>
      <h1 className="signup-form">Sign Up</h1>
        <label className="boxes">
          <input
            required
            type="text"
            minLength='5'
            placeholder="Username" 
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="boxes">
          <input
            required
            type='password'
            minLength='5'
            placeholder="Password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className='signup-button' type='submit' onClick={handleSignup}>
          Sign Up
        </button>
        <h2>You already have an account?</h2>
        <button className='login-button' type='submit' onClick={handleLogin}>
          Log in
        </button>
      </form>
    </section>
  )
}
