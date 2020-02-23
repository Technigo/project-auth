import React, { useState } from 'react'

const URL = 'http://localhost:8080/users'

export const App = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    ///// not done!
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
  }

  return (
    <div>
      <from>
        <h1>Sign Up</h1>
        <label>
          Name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </from>
    </div>
  )
}
