import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user, login } from '../reducers/user';
import { Button } from './Button';
import { Secret } from './Secret';
import styled from 'styled-components';

import { FormButton, MainContainer } from 'styling/GlobalStyles';

const SIGNUP_URL = 'http://localhost:8080/users';
// const LOGIN_URL = 'http://localhost:8080/sessions';

export const Form = (showSecret) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("LogIn")
  const error = useSelector((store) => store.user.statusMessage);

  // const handleLoginSuccess = (loginResponse) => {
  //   dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
  //   dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
  //   dispatch(user.actions.setStatusMessage({ statusMessage: 'Successful login' }));
  // }

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
          throw new Error('Unable to log in, please check your username and password.');
        } else {
          return res.json();
        }
      })
      .then((json) => {
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
      })
      .catch((error) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: error.toString() }));
      });
  };


  //     .then((res) => {
  //       if (!res.ok) {
  //         throw 'Failed to sign up';
  //       }
  //       return res.json();
  //     })
  //     .then((json) => handleLoginSuccess(json))
  //     .catch((err) => handleLoginFailed(err));
  // }

  // To log in a user
  const handleLogin = event => {
    event.preventDefault();
    dispatch(login(email, password));
  };
  //   fetch(LOGIN_URL, {
  //     method: 'POST',
  //     body: JSON.stringify({ name, password, email }),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw 'Failed to log in';
  //       }
  //       return res.json();
  //     })
  //     .then((json) =>
  //       handleLoginSuccess(json))
  //     .catch((err) => handleLoginFailed(err));
  // };

  // Is accessToken exist
  if (accessToken) {
    return <Secret />
  }

  // If user is logged out, show the signup / login form
  return (
    <MainContainer>
      {section === "LogIn" && (
        <>
          <FormWrapper onSubmit={handleLogin}>
            <Heading>Log In</Heading>
            <label>
              <InputField
                required
                type="email"
                placeholder="Your E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
              <InputField
                required
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            </label>
            <FormButton type="submit" onClick={handleLogin}>Log In</FormButton>
          </FormWrapper>
          <AccountWrapper>
            <AccountText>Not having an account yet?</AccountText>
            <Button title="Sign up here" function={setSection} value="SignUp"></Button>
          </AccountWrapper>
        </>
      )}

      {section === "SignUp" && (
        <>
          <FormWrapper onSubmit={handleSignup}>
            <Heading>Sign Up</Heading>
            <label>
              <InputField
                required
                placeholder="Your Name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)} />
            </label>
            <label>
              <InputField
                required
                type="email"
                placeholder="Your E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
              <InputField
                required
                // Hur lägger vi in ex. minlength 5 som i backend?
                minlength="5"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={event => setPassword(event.target.value)} />
            </label>
            <FormButton type="submit" onClick={handleSignup}>Sign Up</FormButton>
          </FormWrapper>
          <AccountWrapper>
            {error && <h4>{`${error}`}</h4>}
            <AccountText>Already a user?</AccountText>
            <Button title="Log in" function={setSection} value="LogIn">Go to Login</Button>
          </AccountWrapper>
        </>
      )}
    </MainContainer>
  );
};

const Heading = styled.h2`
  padding: 8px;
  align-items: center;
  color: #fff;
  font-size: 20px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  background: #00544F;
  border: none;
  border-bottom: 1px solid #749694;
  margin: 8px;
  padding: 10px 6px;

  ::-webkit-input-placeholder {
    color: #749694;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #749694;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #749694;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #749694;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AccountText = styled.p`
  font-size: 12px;
  padding: 4px;
`;
