import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user } from './reducers/user'

export const SignIn = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }))
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }))
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success!' }))
  }

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setSecret({ secret: null }))
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch('http://localhost:8080/sessions', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' }
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

  return (
    <form>
      <label>
        Username:
        <input className='name' required value={name} onChange={(event) => setName(event.target.value)}/>
      </label>

      <label>
        Password:
        <input className='password' type= 'password' required value={password} onChange={(event) => setPassword(event.target.value)}/>
      </label>

      <button className='sign-in-button' type='submit' onClick={handleLogin}>
        Sign in
    </button>
    </form>
  )
}