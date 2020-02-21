import React, { useState } from 'react'

export const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // We should check if this works and show different messages
  // to the user depending on if the registration was successful or not
  const handleRegister = event => {
    event.preventDefault()
    fetch("http://project-auth-jmm.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setName("")
        setEmail("")
        setPassword("")
      })
      .catch(err => console.log("error:", err))
  }


  return (
    <div className="form-container">
      <form>
        <div className="form-title">Register</div>

        <div className="form-text">Name</div>
        <input
          type="text"
          onChange={event => setName(event.target.value)}
          value={name}
          placeholder="Name"
        />

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
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  )
}