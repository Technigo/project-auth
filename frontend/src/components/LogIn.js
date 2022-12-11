import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Buttons";
import { useDispatch, useSelector, batch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import { ButtonDiv } from "./Buttons";

const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState("login")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = useSelector((store) => store.user.accessToken)
  const error = useSelector((store) => store.user.error)
  console.log(error)

  useEffect(() => {
    if(accessToken) {
      navigate("/")
    }
  }, [accessToken])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    }
    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.sucess) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setUserId(data.response.id))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
  }

  return (
    <FormSection>
      {mode === "login" && <h1>Log in</h1>}
      {mode === "register" && <h1>Sign up</h1>}
      <Form onSubmit={onFormSubmit}>
          <label htmlFor="username">Username</label>
          <input 
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <ButtonDiv>
            {mode === "login" && <Button type="submit">Log in</Button>}
            {mode === "register" && <Button type="submit">Register</Button>}
          </ButtonDiv>
      </Form>
      <div>
        <label htmlFor="register">Register</label>
        <input type="radio" id="register" checked={mode === "register"} onChange={() => setMode("register")} />
        <label htmlFor="login">Login</label>
        <input type="radio" id="login" checked={mode === "login"} onChange={() => setMode("login")} />
      </div>
      {/* <ErrorMsg>{error}</ErrorMsg> */}
    </FormSection>
  )
}
export default LogIn

export const FormSection = styled.section`
  background-color: #FFEEE3;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 700;
    font-size: 45;
    margin-bottom: 20px;
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px;

  input {
    padding: 15px;
    margin: 5px;
    border-radius: 10px;
    border: none;
  }
`
const ErrorMsg = styled.p`
  color: red;
  margin-top: 10px;
`