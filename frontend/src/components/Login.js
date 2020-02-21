import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const url = 'http://localhost:8080/sessions'

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(url, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (!res.ok) {
        throw new Error("Your e-mail and/or password was incorrect")
      }
      return res.json()
    }).then(({ userId, accessToken }) => {
      if (accessToken) {
        window.localStorage.setItem("accessToken", accessToken)
        window.localStorage.setItem("userId", userId)
        history.push(`/mySite`)
      }
    }).catch(err => {
      setError(err.message)
    })
  }

  return (
    <form>
      <h2>Log in</h2>
      {error && <h3>{error}</h3>}
      <label htmlFor="email">Email:
        <input id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="password">Password:
        <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Login</button>
    </form>
  )
}