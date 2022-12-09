import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import user from "../reducers/user";
import { API_URL } from "../utils/urls";

const LogIn = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("register");
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const mode = useSelector((store) => store.user.mode);

  useEffect(() => {
    if (accessToken) { //useEffect checks if accessToken is provided, if yes, then should navigate to mainpage
      navigate("/")
    }
  }, [accessToken, navigate]) // It shall trigger everytime accessToken changes

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password }) // samma som: username: username, password: password
    } // mode är ett argument 
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then(data => {
        if (data.success) {
          batch(() => { // All dispatches will trigger our rerender only once
            dispatch(user.actions.setUserName(data.response.username))
            dispatch(user.actions.setUserId(data.response.id))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserName(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response)); // should be displayed somehow in frontend if error
          })
        }
      })
  }
  return (
    <>
      <OuterWrapper>
        <h1>{mode === "register" ? "Create a New Account" : "Welcome back!"}</h1>
        <form onSubmit={onFormSubmit}>
        <InnerWrapper>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            placeholder={mode === "register" ? "Username" : "Username"}
            onChange={event => setUserName(event.target.value)} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="pwd"
            autoComplete="off"
            value={password}
            placeholder={mode === "register" ? "Minimum 5 characters" : "Password"}
            onChange={event => setPassword(event.target.value)} /> {/* password is shown in frontend.... */}

          <button
            type="submit"
            disabled={password.length < 5 && mode === "signup"}>
            {mode === "register" ? "Sign Up" : "Log in"}
          </button>
        </InnerWrapper>
        </form>
        <ButtonWrapper>
          <label htmlFor="register">Register</label>
          <input
            type="radio"
            id="register"
            checked={mode === "register"}
            onChange={() => setMode("register")} /> {/* Register button does not work in frontend (log in do) */}
          <label htmlFor="login">Login</label>
          <input
            type="radio"
            id="login"
            checked={mode === "login"}
            onChange={() => setMode("login")} />
        </ButtonWrapper>
      </OuterWrapper>
    </>
  )
}

// from previus project, maybe we sould use the catch and finally in this project too? Dont know if needed 


/* const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: new, message: newThought })
    })
      .then((res) => res.json())
      .then((data => {
        setNewThought((previousThoughts) => [newUserThought, ...previousThoughts])
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setNewThought('')
        setNewName('')
        fetchThoughts()
      })
  } */

export default LogIn

  const OuterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: lightblue;
    `
  const InnerWrapper = styled.div`
    width: 26vh;
    height: 15vh;
    `

  const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 160px;
    justify-content: space-between;
    align-items: center;
    `

  const input = styled.input `
    display: flex;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    width: 200px;
    `
  
  const form = styled.form `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50vw;
    height: auto;
    padding: 20px;
    `
  const Label = styled.label `
    text-align: center;
    font-size: 12px`

  const Button = styled.button `
    margin: 10px; `