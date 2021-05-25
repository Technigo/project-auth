import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

export const LogIn = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const onLogIn = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setIsLoggedIn(true)
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  return (
    <>
    {isLoggedIn ? (
        <Redirect to ="/content" />
      ) : (
      <form>
        <h2>Log In</h2>
        <label>
          Username
          <input onChange={(e) => setUsername(e.target.value)} type="text" />
        </label>
        <label>
          Password
          <input onChange={(e) => setPassword(e.target.value)} type="password" />
        </label>
        <button onClick={onLogIn} type="submit">Log in</button>
      </form>
      )}
    </>
  )
}