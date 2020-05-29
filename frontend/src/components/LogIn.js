import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { user, logout } from '../reducers/user';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';

const LOGIN_URL = "https://project-w20-auth-api.herokuapp.com/sessions";

export const LogIn = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [logIn, setLogIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setUserName({ name: loginResponse.name }));
  };

  const handleLoginFailed = () => {
    dispatch(logout());
  };

  const handleLogin = (event) => {
    event.preventDefault();
    
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) {
        setErrorMessage(true)
      } else {
        setErrorMessage(false)
        setLogIn(true)
        return (res.json())
      }
    })
    .then((json) => handleLoginSuccess(json))
    .catch((err) => handleLoginFailed(err));
  };

  if (logIn === false) {
    return (
      <div>
        <Form onSubmit={handleLogin}>
          <label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            <button type="submit">Log in</button>
          </label>
        </Form>
        {errorMessage === true ? <p>Could not log in, try again</p> : null}
      </div>
    )
  } else {
    return <Redirect to='/secrets' />
  }
};


const Form = styled.form`
  margin: 15px 0;
  width: 95%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: RGBA(248,177,149,1);
  border-radius: 6px;
  @media (min-width: 668px) {
    width: 80%;
    padding: 20px 40px;
  }
  @media (min-width: 800px) {
    width: 80%;
  }
  @media (min-width: 992px) {
    width: 80%;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 5px;
  margin: 5px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
`;
