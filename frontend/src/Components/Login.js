import React, { useState } from 'react'
import { Profile } from './Profile'

const loginUrl = 'http://localhost:8080/sessions'

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => setLoggedInUser(json))
      .catch(err => console.log('error:', err))

  }

  if (loggedInUser === null) {
    return (
      <>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>
            Name
        <input
              required
              value={name}
              onChange={event => setName(event.target.value)} />
          </label>
          <label>
            Password
      <input
              type="password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)} />
          </label>
          <button>Login</button>
        </form>

        {/* if account exist{
            // <Profile /> }*/}

      </>
    )
  } else {
    return (<Profile />)
  }
}