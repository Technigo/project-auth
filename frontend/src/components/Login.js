import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'

export const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const url = 'https://auth-pinky-and-brain.herokuapp.com/sessions'

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(url, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Your e-mail and/or password was incorrect')
      }
      return res.json()
    }).then(({ userId, accessToken }) => {
      if (accessToken) {
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('userId', userId)
        dispatch(auth.actions.login())
        history.push('/mySite')
      }
    }).catch((err) => {
      setError(err.message)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label htmlFor="email">Email:
        <input id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="password">Password:
        <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="error">*{error}</p>}
      <button type="submit">Login</button>
    </form>
  )
}