import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "reducers/user";

import { API_URL } from "utils/utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState("register");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  console.log(accessToken)

  useEffect(() => {
    if (accessToken) {
      navigate("/main");
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
          });
        }
      });
  };

  return (
    <MainWrapper>
      <CardWrapper>
     
        <InputsWrapper>
        <RadioBtns>
        <Register>
        <LabelReg htmlFor="register">Register</LabelReg>
        <input
          type="radio"
          id="register"
          checked={mode === "register"}
          onChange={() => setMode("register")}
        />
        </Register>

         <LoginWrap>
        <LabelLogin htmlFor="login">Login</LabelLogin>
        <input
          type="radio"
          id="login"
          checked={mode === "login"}
          onChange={() => setMode("login")}
        />
        </LoginWrap>
        </RadioBtns>
        

        <Form onSubmit={onFormSubmit}>
          <LabelUser htmlFor="username">Username</LabelUser>
          <UserInput
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <LabelPassword htmlFor="password">Password</LabelPassword>
          <PasswordInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        <LoginBtn type="submit">Login</LoginBtn>
        </Form>
        </InputsWrapper>
        
        <LinkWrapper>
        <LinkHome to="/">Home</LinkHome>
        </LinkWrapper>

      </CardWrapper>
    </MainWrapper>
  );
};

/////////// Styled components

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const LinkWrapper = styled.div`
display: flex;
flex-direction: column;
`

const RadioBtns = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 20px;
margin-bottom: 0;
`

const Register = styled.div`
`
const LoginWrap = styled.div`
`

const CardWrapper = styled.div`
  min-width: 80vw;
  min-height: 45vh;
  padding: 20px 10px 10px 10px;
  background-color: #fcf9e8;
  border: 1px solid black;
  box-shadow: 5px 5px 0 0 black;
  margin-top: 60px;

  &:hover {
    box-shadow: 5px 5px 0 0 #00936E;
  }

  @media (min-width: 768px) {
    min-width: 40vw;
  }
`;

const LinkHome = styled(Link)`
  font-family: 'League Spartan', sans-serif;
  font-weight: 300;
  text-decoration: none;
  color: black;

  &:active {
    color:black;
  }

`;

const InputsWrapper = styled.div`
margin-top: 20px;
margin-bottom: 30px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  
`;

const LabelUser = styled.label`
font-family: 'League Spartan', sans-serif;
font-weight: 700;
margin: 10px 0 10px 0;
`

const LabelPassword = styled(LabelUser)`

`
const LabelReg = styled(LabelUser)`
margin: 0;
`
const LabelLogin = styled(LabelUser)`
margin: 0;
`

const UserInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  width: 200px;
  `;

const PasswordInput = styled(UserInput)`

margin-bottom: 20px;
`;

const LoginBtn = styled.button`
  font-family: 'League Spartan', sans-serif;
  width: 209px;
  height: 40px;
  cursor: pointer;
`;

export default Login;
