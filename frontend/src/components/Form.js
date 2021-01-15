/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { user } from '../reducers/user'
import { Button } from '../lib/Button'
import { Input } from '../lib/Button'
// import { Secrets } from './Secrets'

const SIGNUP_URL = 'http://localhost:8081/users'
const LOGIN_URL = 'http://localhost:8081/sessions'

// to either LOGIN or REGISTER as a new user
// need error msg when login fails
export const Form = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    )
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }))
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success' }))
  }

  const handleLoginFail = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
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

  const handleSignup = (event) => {
    event.preventDefault()
    console.log('signup')

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Signup failed'
        }
        return res.json()
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFail(err))
  }

  const handleNewUser = (event) => {
    event.preventDefault()
    setIsNewUser(true)
  }

  if (accessToken) {
    return <p>Secrets!</p>
  }

  if (!isNewUser) {
    return (
      // conditionally render 
      <>
        <form>
          <h1>Login</h1>
          <label>
            email
            <input
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            password
            <input
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button
            type="submit"
            onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>Not registered yet?</p>
        <Button onClick={handleNewUser}>Sign up here</Button>  {/* make this a link */}
      </>
    )
  }

  return (
    <form>
      <h1>Signup</h1>
      <label>
        email
        <input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        username
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        password
        <input
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button
        type="submit"
        onClick={handleSignup}>
        Sign up
      </button>
    </form>
  )
}