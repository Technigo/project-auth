import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Form from './Form'

const Register = () => {
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
        mode="users"
        title="Register"
      />
      <Link to="/login">Already signed up? Log in here!</Link>
    </>
  )
}
export default Register
