import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from '../reducers/credentials'

import Button from './Button'
const Form = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

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

  return (
    <section className="container">
      <form className="form" onSubmit={onFormSubmit}>
        <div>
          <label>Username</label>
          <div className="input-field">
            <input type='text' value={username} onChange={onUsernameChange} />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div className="input-field">
            <input type='password' value={password} onChange={onPasswordChange} />
          </div>
        </div>
        <div className="signin">
          <Button 
            text='Sign in'
            type='submit'
            onClick={() => setMode('signin')}
          />
        </div>
        <div className="signup">
          <p>Not having an account yet? Sign up! </p>
          <Button 
            text='Sign Up'
            type='submit'
            onClick={() => setMode('signup')}
          />
        </div>
      </form>

    </section>
  )
}

export default Form