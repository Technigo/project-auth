import React, { useState } from 'react'
import './index.css'

export const App = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    // setShowResult(true)
  }
  return (
    <main>
      <h1>Sign up to see secret image! </h1>
      <form onSubmit={handleSubmit}>
        <label for='name'>Name</label>
        <input
          id='name'
          type='text'
          onChange={(event) => setName(event.target.value)}
          required
          value={name}
        />

        <label for='email'>Email</label>
        <input
          id='email'
          type='text'
          onChange={(event) => setEmail(event.target.value)}
          required
          value={email}
        />

        <label for='password'>Password</label>
        <input
          id='password'
          type='text'
          onChange={(event) => setPassword(event.target.value)}
          required
          value={password}
        />

        <label for='name'>Repeat password</label>
        <input
          id='password'
          type='text'
          onChange={(event) => setPassword(event.target.value)}
          required
          value={password}
        />
        <button type='submit'>Sign up</button>
      </form>
    </main>
  )
}
