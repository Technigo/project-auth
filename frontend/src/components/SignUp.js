import React, { useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import { user } from "../reducers/user";

const SIGNUP_URL = "https://signinprojecttechnigo.herokuapp.com/users"

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
const StyledButton = styled.button`
`


export const SignUp = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
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

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  return (

    <SignInWrapper>
      <Form>
        <Label>Förnamn
            <Input type="Text" placeholder="Förnamn" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </Label>
        <Label>Efternamn
        <Input type="Text" placeholder="Efternamn" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </Label>
        <Label>Adress
            <Input type="Text" placeholder="Din gata" value={address} onChange={(event) => setAddress(event.target.value)} />
        </Label>
        <Label>Postnummer
            <Input type="Number" placeholder="123 45" value={zipCode} onChange={(event) => setZipCode(event.target.value)} />
        </Label>
        <Label>Ort
            <Input type="Text" placeholder="Malmö" value={city} onChange={(event) => setCity(event.target.value)} />
        </Label>
        <Label>Email
            <Input type="text" required placeholder="dittnamn@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Label>
        <Label>Password
            <Input type="password" required placeholder="********" vale={password} onChange={(event) => setPassword(event.target.value)} />
        </Label>
      </Form>
      <StyledButton type="submit" onClick={handleSignup}>Registrera dig</StyledButton>
    </SignInWrapper>
  )
}
