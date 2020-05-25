import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const fetch_URL = 'https://auth-narnia.herokuapp.com/signup'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSignup = event => {
    event.preventDefault()

    fetch(fetch_URL, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          console.log('error:')
        } else {
          return res.json()
        }
      })
    .then(() => {
          setName('')
          setEmail('')
          setPassword('')
          history.push('/login')
        })
      .catch(err => console.log("error:", err))
  }

  return (
    <form>
      <label> Name:
        <input type="text" required
          value={name} onChange={event => setName(event.target.value)} />
      </label>

      <label> Email:
        <input type="email" required
          value={email} onChange={event => setEmail(event.target.value)} />
      </label>

      <label> Password:
        <input type="password" required
          value={password} onChange={event => setPassword(event.target.value)} />
      </label>

      <button type="submit" onClick={handleSignup}>
        Submit
      </button>
    </form>
  )
}