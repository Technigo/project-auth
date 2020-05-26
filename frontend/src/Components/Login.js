import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

export const Login = ({ loggedIn, setLoggedIn }) => {
  const history = useHistory()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  // var accessToken = localStorage.getItem('accessToken')
  // var userId = localStorage.getItem('userId')
   
  const handleSubmit = async (event) => {
    event.preventDefault()
    setName("")
    setPassword("")

    try {
      await fetch('http://localhost:8080/sessions', {
        method: 'POST',
        headers: {
          "content-type": "application/json" 
        },
        body: JSON.stringify({
          "name": name,
          "password": password
      }) 
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Username and/or password is incorrect')
      }
      return res.json()
    })
    .then(({ userId, accessToken }) => {
      if (accessToken && userId) {
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('userId', userId)
        setLoggedIn(true)
        history.push(`/AuthorizedUser`)
      }
    })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <form>
      <label for="username">
        Username
      </label>

      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        id="username">
      </input>

      <label for="password">
        Password
      </label>

      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        id="password">
      </input>

      <button type="submit" onClick={(event) => handleSubmit(event)}> Sign in </button>
      
    </form>
    
    </>
    )
}