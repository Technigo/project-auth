/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { user } from '../reducers/user'
import { Button } from '../lib/Button'
import { Input } from '../lib/Input'
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
  const [loginFailed, setLoginFailed] = useState(false)

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
    setLoginFailed(true)
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
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFail(err))
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
    setEmail('')
    setPassword('')
  }

  if (accessToken) {
    return <p>Secrets!</p>
  }

  if (!isNewUser) {
    return (
      <>
        <form>
          <h1>Login</h1>
          <label>
            email
            <Input
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            password
            <Input
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)} />
          </label>
          <Button
            type="submit"
            onClick={handleLogin}>
            Login
          </Button>
        </form>
        {loginFailed && <p>Wrong email or password. Please try again!</p>}
        <p>Not registered yet?</p>
        <Button onClick={handleNewUser}>Sign up here</Button>
      </>
    )
  }

  return (
    <form>
      <h1>Signup</h1>
      <label>
        email
        <Input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        username
        <Input
          required
          minLength='2'
          maxLength='20'
          value={name}
          onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        password
        <Input
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)} />
      </label>
      <Button
        type="submit"
        onClick={handleSignup}>
        Sign up
      </Button>
    </form>
  )
}