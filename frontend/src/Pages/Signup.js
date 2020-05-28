import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { ErrorMessage } from 'Components/ErrorMessage'
import { LinkSection } from 'Components/LinkSection' 
import { AccountHeader } from 'Components/AccountHeader'

export const Signup = () => {
  const history = useHistory()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
 
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(false)
    setErrorMessage("")

    if (password !== confirmedPassword) {
      setErrorMessage("Passwords do not match")
      setError(true)
    } else {
    
    await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        "content-type": "application/json" 
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
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
    .catch(err => { 
      setErrorMessage(err.message)
      setError(true)
      console.log(err)
    }
  )
}}
  
  return (
    <>
    <section className="login-register">

      < AccountHeader title="Register new account"/>

      <form onSubmit={(event) => handleSubmit(event)}>
        <label for="username">
          Username:
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          id="username"
          required>
        </input>

        <label for="email">
          E-mail:
        </label>

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="email"
          required>
        </input>

        <label for="password">
          Password:
        </label>

        <input
          minLength="6"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
          required>
        </input>

        <label for="confirmed-password">
        Confirm password:
        </label>

        <input
          value={confirmedPassword}
          onChange={(event) => setConfirmedPassword(event.target.value)}
          type="password"
          id="confirmed-password"
          required>
        </input>

        {error &&
          < ErrorMessage errorMessage={errorMessage}  />       
        }

          <button type="submit"> 
            Create user  
          </button>
      </form>

      < LinkSection title="Already got an account?" link="/" linkTitle="Sign in"/>

    </section>
    </>
    )
}
