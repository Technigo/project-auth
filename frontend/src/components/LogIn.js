import React, { useState } from "react"
import styled from "styled-components"
import { Profile } from "./Profile"
import { useDispatch, useSelector } from 'react-redux';
import { user } from "../reducers/user";

const LOGIN_URL = "https://signinprojecttechnigo.herokuapp.com/sessions"

const SignInWrapper = styled.div`
background-color: #FFFF;
width: 275px; 
height: 50%vh; 
`

const Form = styled.form`

`
const Label = styled.label`
`

const Input = styled.input`
`

const Button = styled.button`
`

export const LogIn = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (loginResponse) => {
    // For debugging only
    const statusMessage = JSON.stringify(loginResponse);
    dispatch(user.actions.setStatusMessage({ statusMessage }));

    // Save the login info
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
  };

  const handleLoginFailed = (loginError) => {
    const statusMessage = JSON.stringify(loginError);
    dispatch(user.actions.setStatusMessage({ statusMessage }));

    // Clear login values
    dispatch(user.actions.logout());
  };

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };
  if (!accessToken) {
    return (
      <>
        <SignInWrapper>
          <Form>
            <Label>Email</Label>
            <Input type="text" required placeholder="dittnamn@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Label>Password</Label>
            <Input type="password" required placeholder="********" value={password} onChange={(event) => setPassword(event.target.value)} />
            <Button type="submit" onClick={handleLogin}>Logga in</Button>
          </Form>
        </ SignInWrapper>
      </>
    )
  } else {
    // If user is logged in, show profile
    return <Profile />;
  }
}


