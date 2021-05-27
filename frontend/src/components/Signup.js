import React, { useState } from 'react'

import { API_URL } from '../reusable/urls'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL('signup'), options)
      .then(res => console.log(res))
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Sign up</button>
    </form>
  )
}

export default Signup