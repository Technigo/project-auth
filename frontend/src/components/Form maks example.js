import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../reducers/credentials'
const Form = ({ mode }) => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitLabel, setSubmitLabel] = useState('Submit')


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
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Sign in</button>
      <button>Sign up</button>
    </form>
  )
}

export default Form