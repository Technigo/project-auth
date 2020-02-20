import React, { useState } from 'react'
import './index.css'

const URL = 'http://localhost:3000/users'

export const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // setShowResult(true)
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user)
      })
  }
  return (
    <main>
      <h1>Sign up to see secret image! </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          onChange={(event) => setName(event.target.value)}
          required
          value={name}
        />

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          onChange={(event) => setEmail(event.target.value)}
          required
          value={email}
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='text'
          onChange={(event) => setPassword(event.target.value)}
          required
          value={password}
        />

        {/* <label htmlFor='name'>Repeat password</label>
        <input
          id='password'
          type='text'
          onChange={(event) => setPassword(event.target.value)}
          required
          value={password}
        /> */}
        <button type='submit'>Sign up</button>
      </form>
    </main>
  )
}
