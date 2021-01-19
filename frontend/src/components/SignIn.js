import React from 'react'
import { useDispatch } from 'react-redux'

import { user } from '../reducers/user'
import { PrettyForm } from '../lib/PrettyForm'

export const SignIn = () => {
  const dispatch = useDispatch()

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

  const handleLogin = (event, name, password) => {
    event.preventDefault()

    fetch('https://project-auth-sara-amanda.herokuapp.com/sessions', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login Failed')
        }
        return res.json()
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err.message))
  }

  return (
    <PrettyForm formTitle={'Sign In'} onClick={handleLogin}/>
  )
}