import React, { useState } from 'react'

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(false)

  const url = 'http://localhost:8080/users'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      fetch(url, {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" }
      })
    } else {
      setError(true)
    }
  }

  return (
    <form>
      <h2>Sign up!</h2>
      <label htmlFor="name">Name:
        <input id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <p>{name}</p>
      </label>
      <label htmlFor="email">Email:
        <input id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <p>{email}</p>
      <label htmlFor="password">Password:
        <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p>Both passwords must be identical</p>}
      <label htmlFor="password-confirm">Confirm the password:
        <input id="password-confirm" type="password" name="password-confirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}
