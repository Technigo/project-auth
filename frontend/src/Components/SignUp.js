import React, { useState } from 'react'

const signUpUrl = 'https://auth-login-project.herokuapp.com/users'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = (event) => {
    event.preventDefault()

    fetch(signUpUrl, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log('error:', err))

  }
  return (
    <form onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
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
      <button>Sign up</button>
    </form>
  )
}


