import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if(accessToken) {
      history.push('/profile')
    }
  }, [accessToken, history])


  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPaswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ email, password })
    }
    fetch(API_URL('sessions'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              userId: data.userId,
              username: data.username,
              accessToken: data.accessToken
            }))
        })
      } else {
          dispatch(user.actions.setErrors(data))
      }
    })
  }

  return (
    <section className="login-container">
      <form className="form-box-left" onSubmit={onFormSubmit}>
        <h1 className="form-heading">Sign in</h1>
        <label className="input-wrapper">
          <p className="input-label">password</p>
          <input
            placeholder="Email"
            className="input-box"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="input-wrapper">
          <p className="input-label">password</p>
          <input
            placeholder="Password"
            className="input-box"
            type="password"
            value={password}
            onChange={onPaswordChange}
          />
        </label>
        <div className="form-buttons-container">
          <button type="submit" className="form-button">Sign in</button>
          <button type="button" className="form-button" onClick={() => history.push('/signup')}>Sign up</button>
        </div>
      </form>
      <div className="form-box-right">
        <img src="./assets/moody.jpeg" alt="feeling bubbles" />
      </div>
    </section>
  )
}

export default LogIn