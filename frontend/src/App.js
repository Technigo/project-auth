import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const App = () => {
  const [signup, setSignup] = useState(false)
  const [login, setLogin] = useState(false)
  const [welcome, setWelcome] = useState(false)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  // const [userId, setUserId] = useState('')
  // const [accessToken, setAccessToken] = useState('')
  // const [welcomeMessage, setWelcomeMessage] = useState("")
  //  const [status, setStatus] = useState(null)

  const SIGNUP_URL = 'http://localhost:8081/users'
  // const LOGIN_URL = 'http://localhost:8081/sessions'
  // const WELCOME_URL = 'http://localhost:8081/welcome'

  const signupUser = event => {
    event.preventDefault()
    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    })
      .then(response => response.json)
      .then(json => { // this will happen either if the user was successfully created or not at the moment
        console.log(json)
        setName('')
        setPassword('')
        setSignup(false)
        setWelcome(true)
      })
  }

  const loginUser = event => {
    event.preventDefault()
    // add fetch
    setLogin(false)
    setWelcome(true)
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
