import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user } from '../reducers/user';
import { Button } from './Button';
import { Content } from './Content';
import styled from 'styled-components';

const SIGNUP_URL = 'http://localhost:8080/users';
const LOGIN_URL = 'http://localhost:8080/sessions';

export const Form = (showSecret) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("LogIn")
  const error = useSelector((store) => store.user.statusMessage);

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Successful login' }));
  }

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Failed to login' }));
  };

  // To sign up a user
  const handleSignup = event => {
    event.preventDefault()

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
      headers: { 'Content-Type': 'application/json' }
    })

      .then((res) => {
        if (!res.ok) {
          throw 'Failed to sign up';
        }
        return res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  }

  // To log in a user
  const handleLogin = event => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Failed to log in';
        }
        return res.json();
      })
      .then((json) =>
        handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // Is accessToken exist
  if (accessToken) {
    return <Content />
  }

  // If user is logged out, show the signup / login form
  return (
    <div>
      {section === "LogIn" && (
        <>
          <h2>Log in:</h2>
          <FormWrapper onSubmit={handleLogin}>
            <label>
              Email:
            <input
                required
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
              Password:
            <input
                required
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            </label>
            <LoginButton type="submit" onClick={handleLogin}>Login!</LoginButton>
          </FormWrapper>
          <h4>Not having an account?</h4>
          <Button title="Sign up" function={setSection} value="SignUp">Go to Sign Up</Button>
        </>
      )}

      {section === "SignUp" && (
        <>
          <FormWrapper onSubmit={handleSignup}>
            <h1>Sign up:</h1>
            <label>
              Name:
        <input
                required
                type="text"
                value={name}
                onChange={event => setName(event.target.value)} />
            </label>
            <label>
              Email:
        <input
                required
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
              Password:
        <input
                required
                // Hur lägger vi in ex. minlength 5 som i backend?
                minlength="5"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            </label>
            <SignupButton type="submit" onClick={handleSignup}>Sign up!</SignupButton>
          </FormWrapper>
          {error && <h4>{`${error}`}</h4>}
          <h4>Already a user?</h4>
          <Button title="Log in" function={setSection} value="LogIn">Go to Login</Button>
        </>
      )}
    </div>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const SignupButton = styled.button`
  width: 100px;
  margin: 6px;
  padding: 4px;
`;

const LoginButton = styled(SignupButton)``;