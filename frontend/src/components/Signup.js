import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'

export const Signup = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(false)

  const url = 'https://auth-pinky-and-brain.herokuapp.com/users'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      fetch(url, {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" }
      })
        .then(() => (dispatch(auth.actions.login())))
    } else {
      setError(true)
    }
  }

  const handleChange = (e, callback) => {
    callback(e.target.value)
    setError(false)
  }

  return (
    <form>
      <h2>Sign up!</h2>
      <label htmlFor="name">Name:
        <input className={error ? 'error' : ''} id="name" type="text" name="name" value={name} onChange={(e) => handleChange(e, setName)} />
      </label>
      <label htmlFor="email">Email:
        <input className={error ? 'error' : ''} id="email" type="text" name="email" value={email} onChange={(e) => handleChange(e, setEmail)} />
      </label>
      <label htmlFor="password">Password:
        <input className={error ? 'error' : ''} id="password" type="password" name="password" value={password} onChange={(e) => handleChange(e, setPassword)} />
      </label>
      <label htmlFor="password-confirm">Confirm the password:
        <input className={error ? 'error' : ''} id="password-confirm" type="password" name="password-confirm" value={passwordConfirm} onChange={(e) => handleChange(e, setPasswordConfirm)} />
      </label>
      {error && <p className="error">* Both passwords must be identical</p>}
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  )
}
