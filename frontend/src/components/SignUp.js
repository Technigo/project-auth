import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/user'

const SIGNUP_URL = 'https://login-logout-authentication.herokuapp.com/users'

export const SignUp = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [signUp, setSignUp] = useState(false)

  const handleSignupFailed  = () => {
    dispatch(logout())
  }

  const handleSignup = (event) => {
    event.preventDefault()

    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      if (!res.ok) {
        setErrorMessage(true)
      } else {
        setErrorMessage(false)
        setSignUp(true)
        return (res.json())
      }
    })
    .then(() => {
      setName('')
      setEmail('')
      setPassword('')
    })
    .catch((err) => handleSignupFailed(err))
  }

  if (signUp === false) {
    return (
      <section>
        <form className='signup-form form-style' onSubmit={handleSignup}>
          <h1>Sign Up</h1>
          <div className='content-container'>
            <label>Name</label>
            <input
              type='text'
              placeholder='User name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength='2'
            />
            <label>Email</label>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <label>Password</label>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength='4'
            />
            <button className='input-button' type="submit">Sign up</button>
          </div>
        </form>
        {errorMessage === true ? <p>Could not create user</p> : null}
      </section>
    )
  } else {
   return <h2>Registration completed, please log in</h2>
  }
}