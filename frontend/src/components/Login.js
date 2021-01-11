import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login, signUp } from '../reducers/user'
import { Button } from './Button'


export const Login = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(name, email, password))
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    dispatch(signUp(name, email, password))
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <form>
        <h1>Sign in</h1>
        <label>
          Name
          <input
            type="text"
            required
            minLength="2"
            value={name}
            onChange={(event) => setName(event.target.value)} />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            required
            value={email}
            //pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
            onChange={(event) => setEmail(event.target.value)} />
        </label>

        <label>
          Password
          <input
            type="text"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </label>
        <Button
          type='submit'
          onClick={handleSignUp}
          text='Sign-up'
          disabled={!name || !password || !email}
          />
        <Button
          type='submit'
          onClick={handleLogin}
          text='Log in' 
          disabled={!name || !password || !email}
          />

      </form>
    </div>
  )
}


//- A registration form.
// Your frontend should have a registration form which POSTs to the API to create a new user
//- A sign-in form.

//FORM
//Name
//email
//password

//buttons - sign up/log in