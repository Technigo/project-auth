import React, { useState } from 'react'

const SIGNUP_URL = 'https://project-auth-technigo.herokuapp.com/users' 
const LOGIN_URL = 'https://project-auth-technigo.herokuapp.com/sessions'
const SECRETS_URL ='https://project-auth-technigo.herokuapp.com/secrets'


export const Login = () => {
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [secrets, setSecrets] = useState('')
  const [status, setStatus] = useState('')

  const handleSignup = (event) => {
    event.preventDefault()
  

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => setStatus(json.message))
      .catch(err => console.log('error:', err))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        handleSecrets(json.accessToken)
        setStatus(json.message)
      })
      .catch(err => console.log('error:', err))
  }

  const handleSecrets = (accessToken) => {
    fetch(SECRETS_URL, {
      method: 'GET',
      headers: { Authorization: accessToken }
    })
      .then(res => res.json())
      .then(json => {
        setSecrets(json.secret)
      })
      .catch(err => {console.log('error:', err)
    })
  }

  return (
    <>
      {!secrets ? (
        <>
          <section className="login">
            <h1>Log in / Sign up</h1>
            <form>
              <input
                type="email"
                minLength="8"
                placeholder="Email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <input
                required
                minLength="8"
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <div className="wrapper-btn">
                <button
                  type="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
                <button
                  type="submit"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
            </form>
          </section>
          <section className="status">
            <p>{status}</p>
          </section>
        </>) : (
        <section className="profile">
          <p>{secrets}</p>
          <button onClick={() => setSecrets(false)}>
            Log out
          </button>
        </section>
      )
      }
    </>
    )
}