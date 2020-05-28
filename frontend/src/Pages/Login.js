import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { ErrorMessage } from 'Components/ErrorMessage'
import { LinkSection } from 'Components/LinkSection'
import { AccountHeader } from 'Components/AccountHeader'

export const Login = ({ loggedIn, setLoggedIn }) => {
  const history = useHistory()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
   
  const handleSubmit = async (event) => {
    event.preventDefault()
    setName("")
    setPassword("")

    try {
      await fetch('http://localhost:8080/sessions', {
        method: 'POST',
        headers: {
          "content-type": "application/json" 
        },
        body: JSON.stringify({
          "name": name,
          "password": password
      }) 
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Username and/or password is incorrect')
      }
      return res.json()
    })
    .then(({ userId, accessToken, userName }) => {
      if (accessToken && userId) {
        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('userId', userId)
        window.localStorage.setItem('userName', userName)
        setLoggedIn(true)
        setError(false)
        history.push('/AuthorizedUser')
      }
    })
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  return (
    <section className="login-register">

    < AccountHeader title="Sign in to account"/>

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

      <label for="password">
        Password:
      </label>

      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        id="password"
        required>
      </input>

      {error && 
        < ErrorMessage errorMessage={"Username and/or password is incorrect!"}  />
      }

      <button type="submit"> Sign in </button>
      
    </form>

    < LinkSection title="New user? " link="/register" linkTitle="Register new account"/>
 
    </section>

    )
}