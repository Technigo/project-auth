//Vår kod
/* import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InnerWrapper, UserInputWrapper } from '../assets/GlobalStyles'
import { Button } from '../assets/GlobalStyles'
import { UserInput } from 'components/UserInput'

export const LogInPage = () => {
  const navigate = useNavigate();
  const onRegisterButtonClick = () => {
    navigate('/register');}
  
    return (
        <InnerWrapper>
          <UserInputWrapper>
            <h1>Please log in</h1>
            <UserInput/>
            <p>Not a member? <Button onClick={onRegisterButtonClick}>Please register here</Button></p>
          </UserInputWrapper>
        </InnerWrapper>

    )

} */


//Daniels kod


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from 'utils/Utils'
import user from 'reducers/user'

const LogInPage = () => {
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("") 
  const [mode, setMode] = useState("login")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken) 

  useEffect(() => {
    if(accessToken) {
      navigate("/dashboard")
    }
  }, [accessToken])

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    }
    fetch(API_URL(mode), options)
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        batch(() => {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUsername(data.response.id));
          dispatch(user.actions.setUsername(data.response.accessToken));
          dispatch(user.actions.setError(null))
        });
      } else {
        batch (() => { 
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setError(data.response))
        })
      }
    })
  }

  return (
  <>
    <label htmlFor="register">Register</label>
    <input type="radio" id="register" checked={mode === "register"} onChange={() => setMode("register")}></input>
    <label htmlFor="login">Login</label>
    <input type="radio" id="login" checked={mode === "login"} onChange={() => setMode("login")} /> 

    <form onSubmit={onFormSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)} />

    <button type="submit">Submit</button>
    </form>
  </>
  
  )

}

export default LogInPage;