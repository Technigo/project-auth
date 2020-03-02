import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../index.css'

const URL = 'http://localhost:3000/sessions'

export const SignIn = ({ onAuthenticate }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  let history = useHistory()
  //changed to let

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.accessToken) {
          onAuthenticate(user.accessToken)
          history.push('/secrets')
        } else {
          setErrorMessage('Username or password is incorrect, try again!')
          //user.message instead so equal to SignIn
        }
      })
  }

  return (
    <main>
      <h1>Sign in to see secret image! </h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

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

        <button type='submit'>Sign in</button>
      </form>
    </main>
  )
}
