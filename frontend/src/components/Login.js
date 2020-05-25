import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { users } from '../reducers/user'

const fetch_URL = 'https://auth-narnia.herokuapp.com/login'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const history = useHistory()

  const handleLogin = event => {
    event.preventDefault()

    fetch(fetch_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          console.log('error')
          // throw new Error('Email or password is incorrect')
        } else {
          return res.json()
        }
      })
      .then(({ accessToken }) => {
        setEmail('')
        setPassword('')
        if (accessToken) {
          dispatch(users.actions.logIn())
          dispatch(users.actions.access(accessToken))
          // dispatch(users.actions.id(userId))
          history.push('/narnia')
        }
      })
      .catch(err => console.log("error:", err))
  }

  return (
    <form onSubmit={handleLogin}>
      <label> Email:
        <input type="email" required
          value={email} onChange={event => setEmail(event.target.value)} />
      </label>

      <label> Password:
        <input type="password" required
          value={password} onChange={event => setPassword(event.target.value)} />
      </label>

      <button type="submit">
        Login
      </button>
    </form>
  )
}