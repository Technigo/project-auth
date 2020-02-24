import React, { useState } from 'react'



const URL = 'http://localhost:8000/users'

export const NewUser = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not create user')
        }
        return res.json()
          .then(json => console.log(json))
          .then(json => setMessage(json.message))
      })
      .then(() => {
        setName("")
        setEmail("")
        setPassword("")
      })
      .catch(err => console.log("error:", err))
      .catch(err => {
        setErrorMessage(err.message)
      })

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Fill in your name, email and password</h3>
        <div className="login-form">
          <label>
            <input className="register" value={name} type="text" placeholder="My name" required onChange={event => setName(event.target.value)} />
          </label>
          <label>
            <input className="register" value={email} type="email" placeholder="Email" required onChange={event => setEmail(event.target.value)} />
          </label>
          <label>
            <input className="register" value={password} type="password" placeholder="Password" required onChange={event => setPassword(event.target.value)} />
          </label>
        </div>
        <button
          className="button"
          type="submit"
          disabled={name.length < 3 || password.length < 4 ? true : false}
          onClick={handleSubmit}>
          SIGN UP
      </button>
      </form>
      <div className="charcountWrapper">
        <p className="charCount">{name.length} / 100 </p>
        <p className="charCount">{password.length} / 12 </p>
      </div>
      <p>{message}</p>

      {errorMessage && <div><p>{errorMessage}</p></div>}
      {message && <div><p>{message}</p></div>}


    </div >
  )
}

