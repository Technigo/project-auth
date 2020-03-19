import React, { useState } from 'react'
import { Login } from './Login'

const URL = 'https://harry-potter-auth.herokuapp.com/users'
// const URL = 'http://localhost:9000/users'

export const App = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerUser, setRegisterUser] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      setRegisterUser(true)
      setUsername('')
      setPassword('')
    })
      .catch(err => console.log('error:', err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up to Hogwarts:</h1>
        <label>
          Username:
            <input
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
            <input
            required
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>REGISTER</button>
      </form>
      {registerUser && <h6>Thank you for signing up</h6>}
      <Login />
    </div>
  )
}
