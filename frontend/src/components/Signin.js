import React, { useState } from 'react'

export const Signin = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('')

  // We need to add code that checks if the email exists in our API and if the password is correct
  const handleSignin = event => {
    event.preventDefault()
    setErrorMessage("")
    fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Your e-mail and/or password was incorrect')
        }
        return res.json()
      })
      .then(({ accessToken }) => {
        // Spara accessToken i webbläsarens local storage,
        window.localStorage.setItem('accessToken', accessToken)

        // Kalla på inskickade funktionen från App, eftersom inloggningen lyckades.
        onLoggedIn()
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }

  return (
    <div className="form-container">
      <form>
        <div className="form-title">Sign-in</div>

        <div className="form-text">Email</div>
        <input
          type="text"
          onChange={event => setEmail(event.target.value)}
          value={email}
          placeholder="Email"
        />

        <div className="form-text">Password</div>
        <input
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
          placeholder="Password"
        />

        <br></br>

        <button
          className="btn-submit"
          type="submit"
          onClick={handleSignin}
        >
          Sign-in
        </button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}