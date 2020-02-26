import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const URL = 'https://auth-ninadisa.herokuapp.com/sessions'
//const URL = 'http://localhost:8000/sessions'

export const LoginUser = props => {
  //useHistory this to route to "StartPage" when login succeeded. 
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('')

  const onLoggedIn = event => {
    event.preventDefault()

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('The user was not found or entered password is wrong')
        }
        return res.json()
      })

      .then(({ accessToken }) => {
        if (accessToken) {
          window.localStorage.setItem('accessToken', accessToken)
          history.push(`/secrets`)
        }
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }


  return (
    <div>
      <form onSubmit={onLoggedIn}>
        <h3>Login with email and password</h3>
        <label>
          <input className="log-in" value={email} type="email" placeholder="Email" required onChange={event => setEmail(event.target.value)} />
        </label>
        <label>
          <input className="log-in" value={password} type="password" placeholder="Password" required onChange={event => setPassword(event.target.value)} />
        </label>
        <button
          type="submit"
          disabled={password.length < 4 ? true : false}
          onClick={onLoggedIn}>
          LOG IN
        </button>
      </form >
      {errorMessage && <div>{errorMessage}</div>}
    </div >
  )
}


// The following snippet accesses the current domain's local Storage object and adds a data item to it using Storage.setItem().
// localStorage.setItem('accessToken');

// The syntax for reading the localStorage item is as follows:
// const accessToken = localStorage.getItem('accessToken');

// The syntax for removing the localStorage item is as follows:
// localStorage.removeItem('myCat');

// The syntax for removing all the localStorage items is as follows:

// // Clear all items
// localStorage.clear();
