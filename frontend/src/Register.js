import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user } from './reducers/user'
import { PrettyForm } from './lib/PrettyForm'

export const Register = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const statusMessage = useSelector((store) => store.user.login.statusMessage)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignupSuccess = (signupResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: signupResponse.accessToken })
    )
    dispatch(
      user.actions.setUserId({ userId: signupResponse.userId })
    )
    dispatch(
      user.actions.setStatusMessage({ statusMessage: 'Signup Success' })
    )
  }

  const handleSignupFailed = (signupError) => {
    console.log("handleSignupFailed")

    dispatch(
      user.actions.setAccessToken({ accessToken: null })
    )
    dispatch(
      user.actions.setStatusMessage({ statusMessage: signupError })
    )
  }

  const handleSignup = (event) => {
    event.preventDefault()

    fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Signup failed")
          throw 'Signup failed'
        }
        return res.json()
      })
      .then((json) => handleSignupSuccess(json))
      .catch((err) => handleSignupFailed(err))
  }

  return (
    <PrettyForm formTitle={'Register'} />
  )
}