/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { user } from '../reducers/user'
import { Button } from '../lib/Button'
import { Input } from '../lib/Input'
import { Secrets } from './Secrets'

// do these need to be edited for deployment?
const SIGNUP_URL = 'http://localhost:8081/users'
const LOGIN_URL = 'http://localhost:8081/sessions'

const FormStyle = styled.form`
  display: flex;
  flex-flow: column nowrap;
`
const Title = styled.h1`
  font-size: 55px;
  color: #85ad99;
`
const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400;
`

// to either LOGIN or REGISTER as a new user
export const Form = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [name, setName] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    )
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }))
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success' }))
    console.log(accessToken)
    setEmail('')
    setName('')
    setPassword('')
    setConfirmedPassword('')
    setIsNewUser(false)
    setLoginFailed(false)
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
          throw new Error('Login failed')
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
          throw new Error('Signup failed')
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
    return <Secrets />
  }

  if (!isNewUser) {
    return (
      <>
        <FormStyle onSubmit={handleLogin}>
          <Title>Login</Title>
          {/* email type? */}
          <Input
            type="email"
            value={email}
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
            required />
          <Input
            type="password"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            required />
          <Button
            type="submit">
            Login
          </Button>

          {loginFailed && <Paragraph>Wrong email or password. Please try again!</Paragraph>}
          <Paragraph>No account?</Paragraph>

          <Button
            type="submit"
            onClick={handleNewUser}>
            Sign up
          </Button>
        </FormStyle>
      </>
    )
  }

  return (
    <FormStyle onSubmit={handleSignup}>
      <Title>Signup</Title>

      <Input
        type="email"
        value={email}
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
        required />

      <Input
        type="text"
        value={name}
        placeholder="username"
        onChange={(event) => setName(event.target.value)}
        minLength="2"
        maxLength="20"
        required />

      <Input
        type="password"
        value={password}
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
        required />

      <Input
        type="password"
        value={confirmedPassword}
        placeholder="password (again)"
        onChange={(event) => setConfirmedPassword(event.target.value)}
        required />

      <Button
        type="submit"
        background="lightgreen"
        disabled={password !== confirmedPassword || password.length === 0}>
        Sign up
      </Button>

      {loginFailed
        && <Paragraph>
            Could not create this user. Please try again with another name or email!
        </Paragraph>}
    </FormStyle>
  )
}
