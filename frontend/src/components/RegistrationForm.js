import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../reducers/auth'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const url = process.env.REACT_APP_API_URL || 'http://localhost:8080'


const handleSubmit = (event, name, email, password, dispatch, setIsRegistrated) => {

  event.preventDefault()
  console.log(url)
  fetch(`${url}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.json())
      }
    })
    .then(json => {
      dispatch(auth.actions.userRegistrated(json))
      setIsRegistrated(true)
    })
    .catch(err => {
      console.log(err)
    })
}


export const RegistrationForm = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistrated, setIsRegistrated] = useState(false)

  return (
    <div className='form-container'>
      <h2>Sign up</h2>
      <p>Or <button className="redirect-button" onClick={() => { dispatch(auth.actions.toggleSigninForm()) }}> sign in to your account</button></p>
      <form onSubmit={event => handleSubmit(event, name, email, password, dispatch, setIsRegistrated)}>
        {isRegistrated &&
          <p className="success-message">You are now registrated</p>}
        <TextField className="standard-basic" label="Name" onChange={(event) => setName(event.target.value)} />
        <TextField className="standard-basic" label="E-mail" type="email" onChange={(event) => setEmail(event.target.value)} />
        <TextField className="standard-basic" label="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
        <Button variant="contained" disableElevation type="submit">Create account</Button>
      </form>
    </div>
  )
}
