import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { user, logout } from '../reducers/user'

// const SIGNIN_URL = 'https://login-logout-authentication.herokuapp.com/users'
const LOGIN_URL = 'https://login-logout-authentication.herokuapp.com/sessions'

export const LoginForm = () => {
  const dispatch = useDispatch()
  // const accessToken = useSelector((store) => store.user.login.accessToken)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [login, setLogin] = useState(false)

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken}))
    dispatch(user.actions.setUserId({ userId: loginResponse.userId}))
    dispatch(user.actions.setUserName({ name: loginResponse.name }));
  //dispatch(user.actions.setStatusMessage({statusMessage: 'Login Success'}))
  }

  // const handleLoginFailed = (loginError) => {
  //   dispatch(user.actions.setAccessToken({ accessToken: null }))
  //   dispatch(user.actions.setSecretMessage({ secretMessage: loginError }))
  // }
   const handleLoginFailed = () => {
    dispatch(logout());
    };
  // const handleSignup = (event) => {
  //   event.preventDefault();

  //   fetch(SIGNIN_URL, {
  //     method: 'POST',
  //     body: JSON.stringify({ name, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw 'Signup Failed'
  //       }
  //       return res.json()
  //     })
  //     .then((json) => handleLoginSuccess(json))
  //     .catch((err) => handleLoginFailed(err))
  // };

  // To sign up a user.
  const handleLogin = (event) => {
    event.preventDefault()

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          setErrorMessage(true)
        } else {
          setErrorMessage(false)
          setLogin(true)
          return res.json()
        }
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
  }
  
  if (login === false) {
  // If user is logged out, show login form
  return (
    <section>
      <form className='login-form form-style'>
        <h1>Login</h1>
        <div className='content-container'>
          <label>Email</label>
          <input
            type='text'
            placeholder='Enter username...'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            minLength="2"
            required
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter Password...'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength="5"
            required
          />
          <button type='submit' onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
      {errorMessage === true ? <p>Could not login, try again</p> : null }
    </section>
  )
  } else {
    return <Redirect to='/secrets' />
  }
}

