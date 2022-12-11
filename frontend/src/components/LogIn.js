import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import styled from 'styled-components';
=======
import styled from 'styled-components/macro'
>>>>>>> d78b809a1e9e76ec42ef118162a94d02060d4a2d
import user from "../reducers/user";
import { API_URL } from "../utils/urls";

const LogIn = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const accessToken = useSelector((store) => store.user.accessToken)
  const mode = useSelector((store) => store.user.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

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
      body: JSON.stringify({ username, password })
    } 
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
        <HeaderWrapper>
          <h1>Fotboll something....</h1>
        </HeaderWrapper>
        <InnerWrapper>
        <h1>{mode === "register" ? "Create a New Account" : "Welcome back!"}</h1>
        <Form onSubmit={onFormSubmit}>
        
          <Label htmlFor="username">Username</Label>
          <InputText 
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            placeholder={mode === "register" ? "Username" : "Username"}
            onChange={event => setUserName(event.target.value)} />

          <Label htmlFor="password">Password</Label>
          <InputText 
            type="password"
            id="pwd"
            autoComplete="off"
            value={password}
            placeholder={mode === "register" ? "Minimum 5 characters" : "Password"}
            onChange={event => setPassword(event.target.value)} />

          <StyledButton
            type="submit"
            disabled={password.length < 5 && mode === "register"}>
            {mode === "register" ? "Sign Up" : "Log in"}
          </StyledButton>
        
        </Form>
        
        <ButtonWrapper>
          <Label htmlFor="register">Register</Label>
          <input
            type="radio"
            id="register"
            checked={mode === "register"}
            onChange={() => dispatch(user.actions.setMode("register"))} />
          <Label htmlFor="login">Login</Label>
          <input
            type="radio"
            id="login"
            checked={mode === "login"}
            onChange={() => dispatch(user.actions.setMode("login"))} />
        </ButtonWrapper>
        </InnerWrapper>
     
      <FooterWrapper>
      <p>&copy;2022 Younas & Sarah | All Rights Reserved</p>
      </FooterWrapper> 
      </OuterWrapper>
    </>
  )
}

export default LogIn

  const HeaderWrapper = styled.header`
  width: inherit;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
  `
  const FooterWrapper = styled.footer`
  position: relative;
  width: 100%;
  background: #3586ff;
  min-height: 126px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .wave {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("https://i.ibb.co/wQZVxxk/wave.png");
  background-size: 1000px 100px;
}
.wave#wave1 {
  z-index: 1000;
  opacity: 1;
  bottom: 0;
  animation: animateWaves 4s linear infinite;
}

  `

  const OuterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(80deg,#86bbb6 50%,#00adff 50%);
    `
  const InnerWrapper = styled.div`
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px;
    margin: 119px;
    text-align: center;
    `
  const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 160px;
    justify-content: space-between;
    align-items: center;
    margin: auto;

    input[type='radio'] {
            /* add margin here of If you want */
            width: 20px;
            height: 20px;
            border: 2px solid #747474;
            border-radius: 50%;
            outline: none;
            opacity: 0.6;
            transition: 0.3s;
            cursor: pointer;
        }
    input[type='radio']:hover:before {
            box-shadow: 0px 0px 0px 12px rgba(80, 80, 200, 0.2); /* control thickens on border here */
            border-radius: 50%;
            opacity: 1;
        }
    input[type='radio']:before {
            content: '';
            display: block;
            width: 100%; /* outside border*/
            height: 100%; /* for outside border */
            border-radius: 50%;
            transition:.3s; /* for animation*/
        }
    input[type='radio']:checked:before {
            background: black;
        }
    `
    // för mig ser det ut som att dessa under inte fungerar.. det är prickar under, men vet inte om
    // det kanske bara är för att jag har dålig uppkoppling och det inte uppdatera
  const InputText = styled.input `
    display: flex;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    width: 200px;
    cursor: pointer;
    `
  const Form = styled.form `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30vw;
    height: auto;
    padding: 20px;
    
    `
  const Label = styled.label `
    text-align: center;
    font-size: 18px;
    `
  const StyledButton = styled.button ` 
  background-color: #1abc9c;
  border: none;
  color: black;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
    
    `