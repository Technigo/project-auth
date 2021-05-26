import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from '../reducers/credentials'
const Form = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

 /*  switch (mode) {
    case 'signup':
      setSubmitLabel('Sign Up')
      break
    case 'signin':
      setSubmitLabel('Sign In')
      break
    default:
      alert('Sorry, something went wrong :(')
  } */

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    dispatch(authenticate(username, password, mode))
  }

  console.log(username)

  return (
    <form onSubmit={onFormSubmit}>
        <label>Username</label>
        <input type='text' value={username} onChange={onUsernameChange} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordChange} />
        <button
            type='submit'
            onClick={() => setMode('signin')}
        >
            Sign In
        </button>
        <button
          type='submit'
          onClick={() => setMode('signup')}
        >
            Sign Up
        </button>
    </form>
  )
}

export default Form