import React, { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const url = 'http://localhost:8080/sessions'

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(url, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
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