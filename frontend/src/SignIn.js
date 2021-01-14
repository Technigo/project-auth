import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user } from './reducers/user'
import { PrettyForm } from './lib/PrettyForm'

export const SignIn = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)

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
    <PrettyForm formTitle={'Sign In'} onClick={handleLogin}/>
  )
}