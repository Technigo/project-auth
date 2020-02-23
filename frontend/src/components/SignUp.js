import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../index.css'

const URL = 'http://localhost:3000/users'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  let history = useHistory()
  //changed to let

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.accessToken) {
          history.push('/sessions')
        } else {
          setErrorMessage(user.message)
        }
      })
  }

  return (
    <main>
      <h1>Sign up to see secret image! </h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

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
          type='password'
          onChange={(event) => setPassword(event.target.value)}
          required
          value={password}
        />

        <button type='submit'>Sign up</button>
      </form>
    </main>
  )
}
