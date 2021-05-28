import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Form from './Form'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        mode="sessions"
        title="Login"
      />
      <Link to="/register">Not a user yet? Sign up here!</Link>
    </>
  )
}
export default Login
