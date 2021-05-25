import React, { useState } from 'react'

const SignUp = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <section>
      <form>
        <h1>Create an account</h1>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={onNameChange}
          />
        </label>
        <label>
          Email
          <input
            placeholder="E-post"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
        <button>Sign up</button>
      </form>
    </section>
  )
}

export default SignUp