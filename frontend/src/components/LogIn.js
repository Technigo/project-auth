import React, { useState } from 'react'
import { Form } from '../shared/shared'
import { Button } from '../shared/shared'

export const LogIn = ({ loggedIn, setLoggedIn, currentUser, setCurrentUser }) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    let user = {
      name: userName,
      password: userPassword
    }
    console.log(user)
    let response = await fetch('http://localhost:8080/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    })

    let result = await response.json()
    console.log("fetch result", result)

    setUserName('')
    setUserPassword('')
    setCurrentUser(result)
    //setLoggedIn(true)
    if (currentUser) {
      setLoggedIn(true)
    }
  }



  return (
    <Form onSubmit={handleLogin}>
      <h1>
        LOG IN HERE:
      </h1>
      <label>
        Name:
      <input
          type='text'
          required
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder='name'>
        </input>
      </label>
      <label>
        Password:
      <input
          type='password'
          required
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
          placeholder="password">
        </input>
      </label>
      <Button
        type='submit'>
        ENTER
      </Button>
    </Form>
  )
}