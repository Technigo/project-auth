import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { account } from '../reducers/account'

import { API_URL, SIGNUP } from '../reusable/urls'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.account.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
        history.push('/authorized')
    }
  }, [accessToken, history])

  const handleOnClick = () => {
    dispatch(account.actions.showSignupForm(false))
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }

    fetch(API_URL(SIGNUP), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(account.actions.setID(data.id))
            dispatch(account.actions.setUsername(data.username))
            dispatch(account.actions.setEmail(data.email))
            dispatch(account.actions.setAccessToken(data.accessToken))
            dispatch(account.actions.setErrors(null))
          })
        } else {
          dispatch(account.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <div className="landingpage-section-wrapper">
      <section className="landingpage-section signup-section">
        <h3>Sign Up!</h3>
        <form className="form signup-form" onSubmit={onFormSubmit}>
          <label htmlFor="username">username</label>
          <input 
            className="input signup-username-input" 
            type="text" 
            value={username} 
            onChange={(event) => setUsername(event.target.value)} 
          />
          <label htmlFor="Email">Email</label>
          <input 
            className="input signup-Email-input" 
            type="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
          />
          <label htmlFor="password">password</label>
          <input 
            className="input signup-password-input" 
            type="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
          />
          <button className="btn signup-button" type="submit">Sign Up</button>
        </form>
        <div>
          <p> Already a member? </p>
          <button 
            className="login-btn" 
            onClick={handleOnClick}
          > 
            Log in here!
          </button>
        </div>
      </section>
    </div>

  )
}

export default SignupForm 