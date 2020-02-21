import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    }).then(({ _id, accessToken }) => {
      if (accessToken) {
        window.localStorage.setItem("accessToken", accessToken)
        window.localStorage.setItem("id", _id)
        history.push(`/mySite/${_id}`)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <form>
      <h2>Log in</h2>
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