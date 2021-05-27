import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    console.log('checking accessToken', accessToken)
    if(accessToken) {
      history.push('/')
    }    
  }, [accessToken, history])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.success) {
        batch(() => {
          dispatch(user.actions.setUsername(data.username))
          dispatch(user.actions.setAccessToken(data.accessToken))
          dispatch(user.actions.setErrors(null))
        })
      }else {
        dispatch(user.actions.setErrors(data))
      }
    })
    .catch()
  }

  return (
    <form
    className="form"
    onSubmit={onFormSubmit} >
      <input 
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="username"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="password"
      />
      <button 
        className="form-button" 
        type="submit" 
        onClick={() => setMode('signin')}
      >
        Sign in
      </button>
      <button 
        className="form-button" 
        type="submit" 
        onClick={() => setMode('signup')}
      >
        Sign up
      </button>
    </form>
  )
}

export default Login