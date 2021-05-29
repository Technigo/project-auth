import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from 'styled-components/macro'

import { API_URL } from "../reusable/urls";

import user from "../reducers/user";

const SigninWrapper = styled.div`
  background-color: #4838a8;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const WelcomeMessage = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 50%;
`

const WelcomeText = styled.p`
  font-size: 24px;
`

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  min-width: 450px;
  min-height: 650px;
  border-radius: 20px;
`

const FormWrapper = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputField = styled.input`
  margin: 5px;
  border-radius: 5px;
  min-width: 200px;
`

const Button = styled.button`
  min-width: 200px;
  background-color: #4838a8;
  color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  height: 40px;

  &:hover {
    background-color: #211661;
  }
`

const Username = styled.label`
  align-self: flex-start;
  margin-left: 130px;
`

const Password = styled.label`
  align-self: flex-start;
  margin-left: 130px;
`

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL("signin"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch();
  };

  return (
    <SigninWrapper>
      <WelcomeMessage>
        <h1>Welcome To Happy Thoughts Website</h1>
        <WelcomeText>Let´s Sign in here</WelcomeText>
      </WelcomeMessage>
      <FormWrapper>
        <InputForm onSubmit={onFormSubmit}>
          <Username for="username">Username</Username>
          <InputField
            id="username" 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Password for="password">Password</Password>
          <InputField 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit'>Sign in</Button>
        </InputForm>
      </FormWrapper>
    </SigninWrapper>
  )
};

export default Signin;
