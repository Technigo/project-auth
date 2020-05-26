import React, { useState } from 'react'

export const Signup = () => {
  
  const [name, setName] = useState()
  const [password, setPassword] = useState()
 
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          "content-type": "application/json" 
        },
        body: JSON.stringify({
          "name": name,
          "password": password
      }) 
    })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form>
      <label for="username">
        Username
      </label>

      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        id="username">
      </input>

      <label for="password">
        Password
      </label>

      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        id="password">
      </input>

      <button type="submit" onClick={(event) => handleSubmit(event)}> Create user </button>
    </form>
    )
}
