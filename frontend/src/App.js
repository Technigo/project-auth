import React, { useState } from 'react'
import { Profile } from './Components/Profile'
import { SignUp } from './Components/SignUp'
import { Login } from './Components/Login'

const URL = 'http://localhost:8080/users'



// DONE! the frontend side of things, you'll need to build up a registration form which POSTs to your API.
// DONE! You'll need to store the access token you get back
// the browser using local storage,
// and then use that token when making other requests to your API.

// DONE A registration form.
// DONE A sign-in form.
// - A page to show the authenticated content from the API.
// - A 'sign out' button which removes the saved access token and redirects the user to the login form.

export const App = () => {
  // const [signUpForm, setSignUpForm] = useState(false)
  // const [loginForm, setLoginForm] = useState(false)
  // const [loggedInUser, setLoggedInUser] = useState(null)
  // const [name, setName] = useState('')
  // const [password, setPassword] = useState('')

  // const handleSubmit = (event) => {
  //   event.preventDefault()

  //   fetch(URL, {
  //     method: 'POST',
  //     // body: JSON.stringify({ name, password }),
  //     headers: { 'Content-type': 'application/json' }
  //   })
  //     .then(res => res.json())
  //     .then(json => setLoggedInUser(json))
  //     .catch(err => console.log('error:', err))

  // }

  return (
    <>
      <Login />
      <span>or</span>
      <SignUp />
    </>
  )
}