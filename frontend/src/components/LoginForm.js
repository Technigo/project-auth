import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {user} from '../reducers/user'

const SIGNIN_URL = 'http://localhost:8080/users'
const LOGIN_URL = 'http://localhost:8080/sessions'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken}))
    dispatch(user.actions.setUserId({ userID: loginResponse.userId}))
    dispatch(user.actions.setStatusMessage({statusMessage: 'Login Success'}))
  }

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Signup Failed'
        }
        return res.json()
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
  };

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
          throw 'Login Failed'
        }
        return res.json()
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err))
  }
  if (accessToken) {
    return <></>;
  }
  // If user is logged out, show login form
  return (
    <section>
      <form className='login-form form-style'>
        <h1>Login</h1>
        <div className='content-container'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Enter username...'
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter Password...'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type='submit' onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </section>
  )
}
