import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

export const Signup = () => {
  const history = useHistory()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
 
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(false)
    setErrorMessage("")

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
    .then(res => {
        return res.json()
    })
    .then(res => {
      if (res.errors) {
        throw new Error (res.message)
      }
      history.push(`/`)
    })
    } catch (err) { 
      setErrorMessage(err.message)
      setError(true)
    }
  }


  return (
    <section className="login-register">

    <div className="header-description">
      <h2>
        Register account
      </h2>
    </div>

      <form>
        <label for="username">
          Username:
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          id="username">
        </input>

        <label for="password">
          Password:
        </label>

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password">
        </input>

        {error &&
        <p>
          {errorMessage}
        </p>
        }

          <button type="submit" onClick={(event) => handleSubmit(event)}> 
            Create user  
          </button>
      </form>
    </section>
    )
}
