import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }
    fetch(API_URL(mode), config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success === true) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={() => setMode('users')}>Register</button>
      <button type="submit" onClick={() => setMode('sessions')}>Login</button>
    </form>
  )
}
export default Login
