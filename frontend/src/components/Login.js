import React, { useState } from 'react'

import Form from './Form'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="path-container">
      <Form
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        mode="sessions"
        title="Login"
        link="/register"
        linkDescription="Not a user yet? Sign up here!"
      />
    </div>
  )
}
export default Login
