import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"

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

    <div className="header-description">
      <h2>
        Sign in
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
        Username and/or password does not match!
      </p>}

      <button type="submit" onClick={(event) => handleSubmit(event)}> Sign in </button>
      
    </form>

    <div className="register-account-link">
      <p> 
        New user? 
        <Link to="/register"> 
          Register new account 
        </Link> 
      </p>
    </div>
  
    
    </section>
    )
}