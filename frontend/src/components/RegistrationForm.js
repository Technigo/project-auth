import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { auth } from '../reducers/auth'

import TextField from '@material-ui/core/TextField';

const url = process.env.API_URL || 'http://localhost:8080'

const handleSubmit = (event, name, email, password) => {
  event.preventDefault()
  console.log(url)
  fetch(`${url}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
}

export const RegistrationForm = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <h2>Sign up</h2>
      <p>Or <button onClick={() => { dispatch(auth.actions.toggleSigninForm()) }}> sign in to your account</button></p>
      <form onSubmit={event => handleSubmit(event, name, email, password)}>
        <TextField id="standard-basic" label="Name" onChange={(event) => setName(event.target.value)} />
        <TextField id="standard-basic" label="E-mail" type="email" onChange={(event) => setEmail(event.target.value)} />
        <TextField id="standard-basic" label="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {name}
      {email}
      {password}
    </>
  )
}