import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-dom'

import { user } from '../reducers/user'
import Secrets from './Secrets'

const SIGNUP_URL = 'http://localhost:8081/users'
const LOGIN_URL = 'http://localhost:8081/sessions'

export const Login = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success' }));
  };

  const handleLoginFail = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json'}
    })
    .then((res) => {
      if (!res.ok) {
        throw 'Login failed'
      }
      return res.json()
    })
    .then((json) => handleLoginSuccess(json)) // to be implemented
    .catch((err) => handleLoginFail(err)) // to be implemented
  }

  if (accessToken) {
    return <Secrets />
  }

  return (
    <section>
      <form>
        <h1>Login</h1>
        <label>
          email
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          password
          <input 
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type='submit' onClick={handleLogin}>
          Login
        </button>
        <p>Not registered yet? Sign up here!</p>  {/* make this a link */}
      </form>
    </section>
  )
}