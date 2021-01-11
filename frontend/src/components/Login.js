import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components/macro";

import { login, signUp, user } from '../reducers/user'
import { Button } from './Button'
import { Profile } from './Profile'
import { Card } from './Card'


export const Login = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [submit, setSubmit] = useState(false)
  // console.log(submit)

  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);


  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(name, email, password))
    dispatch(user.actions.setLoggedIn())
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    dispatch(signUp(name, email, password))
    dispatch(user.actions.setLoggedIn())
    setName('')
    setEmail('')
    setPassword('')
  }

  // const handleSubmit = event => {
  //   event.preventDefault()
  //   setSubmit(true)
  // }

  // const handleSubmit = () => {
  //   console.log('before')
  //   dispatch(user.actions.setLoggedIn())
  //   console.log('after')
  // }

  return (
    <LoginForm 
      title="another card" 
      subTitle="another subtitle"
    >
      {!isLoggedIn ? (
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
              //pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
              //https://www.npmjs.com/package/validator
              //https://codesandbox.io/s/pedantic-taussig-bqg3j?file=/src/App.js:745-757
              //https://www.telerik.com/blogs/up-and-running-with-react-form-validation
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
      ) : (
          <Profile />
        )}
    </LoginForm>
  )
}

const LoginForm = styled.div`
  width: 300px;
`;

//- A registration form.
// Your frontend should have a registration form which POSTs to the API to create a new user
//- A sign-in form.
