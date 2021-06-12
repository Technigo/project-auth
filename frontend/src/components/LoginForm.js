import React, { useState, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { account } from '../reducers/account'

import { API_URL, SIGNIN } from '../reusable/urls'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.account.accessToken)
  const error = useSelector(store => store.account.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
        history.push('/authorized')
    }
  }, [accessToken, history])

  const handleOnClick = (action) => {
    dispatch(action)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL(SIGNIN), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(account.actions.setID(data.id))
            dispatch(account.actions.setUsername(data.username))
            dispatch(account.actions.setEmail(data.email))
            dispatch(account.actions.setAccessToken(data.accessToken))
            dispatch(account.actions.setProfileInfo(data))
            dispatch(account.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              id: data.id,
              username: data.username,
              accessToken: data.accessToken,
              email: data.email,
              fullName: data.fullName,
              age: data.age,
              location: data.location,
              desc: data.description
            }))
          })
        } else {
          dispatch(account.actions.setErrors(data))
        }
      })
  }

  return (
    <div className="landingpage-section-wrapper">
      <section className="landingpage-section login-section">
        <h3>Log in</h3>
        <form className="form login-form" onSubmit={onFormSubmit}>
          <label htmlFor="username">username</label>
          <input 
            className="input login-username-input" 
            type="text" 
            value={username} 
            onChange={(event) => setUsername(event.target.value)} 
          />
          <label htmlFor="password">password</label>
          <input 
            className="input login-password-input" 
            type="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
          />
          {error && <p className="error-msg">{error.message}</p>}
          <button className="btn login-button" type="submit">log in</button>
        </form>
        <div>
          <p> Not yet a member? </p>
          <button className="create-btn" onClick={() => handleOnClick(account.actions.showSignupForm(true))}> create an account</button>
        </div>
      </section>
    </div>
  )
}
export default LoginForm