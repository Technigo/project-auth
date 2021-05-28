import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './Register.css'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)
  

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()
  const errorMessage = useSelector(store => store.user.errors)
  

  useEffect(() => {

    if (accessToken) {
        history.push('/mainpage')
    }
  }, [accessToken, history])

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
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              username: data.username,
              accessToken: data.accessToken
            }))
          })  
        } else {
            dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
    setUsername('')
    setPassword('')
  }


  return (
    <main className="main-container">
    <div className="form-container">
    <h1 className="main-heading">Who's in the end...?</h1>
    <form onSubmit={onFormSubmit} spellCheck="false">
      <h2 className="sub-heading">Sign in or register to find out!</h2>
      <div className="input-field-container">
      <input 
        type="text"
        placeholder="Username"
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
        {errorMessage ? <p className="error-message">{errorMessage.message}</p> : ''}
      </div>
      <div className="button-container">
      <button 
        type="submit"
        className="button" 
        onClick={() => setMode('signin')}>
          SIGN IN
      </button>
      <button 
        type="submit"
        className="button"  
        onClick={() => setMode('register')}>
          REGISTER
      </button>
      </div>
    </form>
    </div>  
    <img 
      className="main-img" 
      alt="twisted cord illustration" 
      src="./assets/snurradsladd.png"
    />
    </main>
  )
}

export default Register