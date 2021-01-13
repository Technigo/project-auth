import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const App = () => {
  const [signup, setSignup] = useState(false)
  const [login, setLogin] = useState(false)
  const [welcome, setWelcome] = useState(false)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  // const [welcomeMessage, setWelcomeMessage] = useState("")
  //  const [status, setStatus] = useState(null)

  const SIGNUP_URL = 'http://localhost:8081/users'
  const LOGIN_URL = 'http://localhost:8081/sessions'
  // const WELCOME_URL = 'http://localhost:8081/welcome'

  const signupUser = event => {
    event.preventDefault()
    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not create user')
        } else {
          return res.json()
        }
      })
      .then(json => {
        console.log(json)
        setUserId(json.userId)
        setAccessToken(json.accessToken)
        setSignup(false)
        setWelcome(true)
      })
      .catch(err => alert(err))
      .finally(() => {
        setName('')
        setPassword('')
      })
  }

  const loginUser = event => {
    event.preventDefault()
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not log in user')
        } else {
          return res.json()
        }
      })
      .then(json => {
        console.log(json)
        setUserId(json.userId)
        setAccessToken(json.accessToken)
        setLogin(false)
        setWelcome(true)
      })
      .catch(err => alert(err))
      .finally(() => {
        setName('')
        setPassword('')
      })
  }

  return (
    <div>
      {!signup && !login && !welcome && // startpage
        <>
          <button onClick={() => setSignup(true)}>Sign up</button>
          <button onClick={() => setLogin(true)}>Log in</button>
        </>
      }
      {signup && !login && !welcome && // sign up page
        <>
          <p>Hi! Please sign up.</p>
          <form onSubmit={signupUser}>
            <label>Name
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                required
                minLength='5'
              />
            </label>
            <label>Password
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                minLength='5'
              />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </>
      }
      {login && !signup && !welcome && // log in page
        <>
          <p>Hi! Please login.</p>
          <form onSubmit={loginUser}>
            <label>Name
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                minLength='5'
                required
              />
            </label>
            <label>Password
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                minLength='5'
                required
              />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </>
      }
      {welcome && !signup && !login && // welcome page
        <>
          <p>Hi!</p>
          <button onClick={() => { setWelcome(false) && setLogin(true) }}>Log out</button>
        </>
      }
    </div >
  )
}
