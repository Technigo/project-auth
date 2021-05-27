import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {

    if (accessToken) {
        history.push('/mainpage')
    }

  }, [accessToken])

  const onFormSubmit = (e) => {
    e.preventDefault()

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
        if (data.success) {
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
    <main className="main-container">
    <h1>Hello! Hello! Welcome! Register or Sign in to access awesomeness</h1>
    <form onSubmit={onFormSubmit}>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <div className="button-container">
      <button type="submit" onClick={() => setMode('signin')}>SIGN IN</button>
      <button type="submit" onClick={() => setMode('register')}>REGISTER</button>
      </div>
    </form>
    </main>
  )
}

export default Register