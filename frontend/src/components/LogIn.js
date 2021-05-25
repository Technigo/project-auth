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
        <label className="input-label">
          Email
          <input
            className="input-box"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="input-label">
          Password
          <input
            className="input-box"
            type="password"
            value={password}
            onChange={onPaswordChange}
          />
        </label>
        <button type="submit">Sing in</button>
        <button type="submit">Sing up</button>
      </form>
      <div className="form-box-right">
        <img src="./assets/moody.jpeg"/>
      </div>
    </section>
  )
}

export default LogIn