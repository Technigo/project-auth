import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import user from '../reducers/user'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if(accessToken) {
      history.push('/profile')
    }
  }, [accessToken, history])

  const onNameChange = (event) => {
    setUsername(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    }

    fetch(API_URL('users'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            //dispatch(user.actions.setFellings(data.feelings))
            dispatch(user.actions.setErrors(null))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
    <section className="login-container">
      <form className="form-box-left" onSubmit={onFormSubmit}>
        <h1 className="form-heading">Create an account</h1>
        <label className="input-wrapper">
          <p className="input-label">Name</p>
          <input
            placeholder="User name"
            className="input-box"
            type="text"
            value={username}
            onChange={onNameChange}
          />
        </label>
        <label className="input-wrapper">
          <p className="input-label">Email</p>
          <input
            className="input-box"
            placeholder="E-post"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="input-wrapper">
          <p className="input-label">password</p>
          <input
            className="input-box"
            placeholder="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
        <div className="form-buttons-container">
          <button type="submit" className="form-button">Sing up</button>
        </div>
      </form>
      <div className="form-box-right">
        <img src="./assets/moody.jpeg" alt="feeling bubbles" />
      </div>
    </section>
  )
}

export default SignUp