import React, { useState } from 'react'

const LogIn = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPaswordChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <section className="login-container">
      <form className="form-box-left">
        <h1 className="form-heading">Sign in</h1>
        <label className="input-wrapper">
          <p className="input-label">password</p>
          <input
            placeholder="Email"
            className="input-box"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="input-wrapper">
          <p className="input-label">password</p>
          <input
            placeholder="Password"
            className="input-box"
            type="password"
            value={password}
            onChange={onPaswordChange}
          />
        </label>
        <div className="form-buttons-container">
          <button type="submit" className="form-button">Sing in</button>
          <button type="submit" className="form-button">Sing up</button>
        </div>
      </form>
      <div className="form-box-right">
        <img src="./assets/moody.jpeg" />
      </div>
    </section>
  )
}

export default LogIn