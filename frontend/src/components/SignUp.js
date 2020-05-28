import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import styled from 'styled-components/macro';

const SIGNUP_URL = "http://localhost:8080/users";

export const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleSignupFailed = () => {
    dispatch(logout());
  };

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) {
        setErrorMessage(true)
      } else {
        setErrorMessage(false)
        setSignUp(true)
        return (res.json())
      }
    })
    .then(() => {
      setName('')
      setEmail('')
      setPassword('')
    })
    .catch((err) => handleSignupFailed(err));
  };

  if (signUp === false) {
    return (
      <div>
        <Form onSubmit={handleSignup}>
          <label>
            <Input
              type="text"
              placeholder="User name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength="2"
            />
          </label>
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
              minLength="4"
            />
          </label>
          <label>
            <button type="submit">Sign up</button>
          </label>
        </Form>
        {errorMessage === true ? <p>Could not create user</p> : null}
      </div>
    );
  } else {
   return <h2>Registration completed, please log in</h2>
  }
};

const Form = styled.form`
  margin: 15px 0;
  width: 95%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: RGBA(255,101,80,0.8);
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
