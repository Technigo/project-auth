import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../reducers/credentials'
const Form = ({ mode }) => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitLabel, setSubmitLabel] = useState('Submit')

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
    
    switch (mode) {
      case 'signup':
        dispatch(signUp(username, password))
        break
      case 'signin':
        dispatch(signIn(username, password))
        break
      default:
        alert('Sorry, something went wrong :(')
    }
    
  }

  console.log(username)

  return (
    <form onSubmit={onFormSubmit}>
        <label>Username</label>
        <input type='text' value={username} onChange={onUsernameChange} />
        <label>Password</label>
        <input type='text' value={password} onChange={onPasswordChange} />
        <button
            type='submit'
        >
            {submitLabel}
        </button>
    </form>
  )
}

export default Form