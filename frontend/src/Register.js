import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export const Register = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignupSuccess = (signupResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken = signupResponse.accessToken })
    )
    dispatch(
      user.actions.setUserId({ userId = signupResponse.userId })
    )
    dispatch(
      user.actions.setStatusMessage({ statusMessage: 'Signup Success' })
    )
  }

  const handleSignupFailed = (signupError) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: null })
    )
    dispatch(
      user.actions.setStatusMessage({ statusMessage: 'Signup error' })
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
          throw 'Signup failed'
        }
        return res.json()
      })
      .then((json) => handleSignupSucess(json))
      .catch((err) => handleSignupFailed(err))
  }


  return (
    <form>
      <label>
        Username:
        <input className='name'
          type='text' />
      </label>

      <label>
        Password:
        <input className='password'
          type='text' />
      </label>

      <button className='register-button' type='submit'>
        Register
    </button>
    </form>
  )
}