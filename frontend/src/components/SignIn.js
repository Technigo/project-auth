import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const URL = 'http://localhost:3000/sessions'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // setShowResult(true)
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
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
      <h1>Sign in to see secret image! </h1>
      <form>
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

        <Link to='/secrets'>
          <button type='submit'>Sign in</button>
        </Link>
      </form>
    </main>
  )
}
