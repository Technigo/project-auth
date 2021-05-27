import React, {useState} from 'react'

import { API_URL } from '../reusable/urls'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // if (data.success) {

        // } else {

        // }
      })
      .catch()
  }


  return (
    <main className="main-container">
    <h1>Hello! Hello! Welcome! Register or Sign in to access awesomeness</h1>
    <form onSubmit={onFormSubmit}>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <div className="button-container">
      <button type="submit" onClick={() => setMode('signin')}>SIGN IN</button>
      <button type="submit" onClick={() => setMode('register')}>REGISTER</button>
      </div>
    </form>
    </main>
  )
}

export default Register