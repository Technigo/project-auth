import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";

import { API_URL } from '../utils/constants';
import user from '../reducers/user';

//styled components
const SigninContainer = styled.section`
	text-align: center;
`;

const LinkText = styled.div`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Radiobutton = styled.input`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Form = styled.form`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Label = styled.label`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Input = styled.input`
  max-width: 58%;
  margin: 20px auto;
  padding: 7px;
  border-radius: unset;
  background-color: transparent;
  border-bottom: 2px solid #000046;
  font-size: 22px;
  font-family: 'PT Sans', sans-serif;
    ::placeholder {
      font-size: 16px;
      color: #cccccc;
    }
`;

const SubmitButton = styled.button`
  background-color: #D9AFD9;
  margin: 20px 0 0 20px;
  border:none;
  border-radius: 8px;
  height: 40px;
  width: 101px;
  font-weight: 700;
  font-size:18px;
  color: black;
  box-shadow: 3px 3px #000046;
  font-family: 'PT Sans', sans-serif;
  padding:0;
`;


const Signin = () => {
  const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signup');

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

const onFormSubmit = (event) => {
  event.preventDeault()

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringifgy({ username, password })
  }

  fetch(API_URL('signup'), options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    if (data.success) {
      batch(() => { //instead of updating store for each dispatch it will only update ones for all with batch
        dispatch(user.actions.setUserId(data.response.userId))
        dispatch(user.actions.setUsername(data.response.username))
        dispatch(user.actions.setAccessToken(data.response.accessToken))
        dispatch(user.actions.setError(null))
      })
    } else {
      batch(() => {
        dispatch(user.actions.setUserId(null))
        dispatch(user.actions.setUsername(null))
        dispatch(user.actions.setAccessToken(null))
        dispatch(user.actions.setError(data.response))
      })
    }
  })
}

  return (
  <SigninContainer>
    <LinkText>
      <Link to='/'> To SignIn'/' !</Link>
    </LinkText>
    <Label htmlFor="signup">Signup</Label>
    <Radiobutton
    id="signup"
    type="radio"
    checked={mode === 'signup'}
    onChange={() => setMode ('signup')}
    />
    <Label htmlFor="signin">Signin</Label>
    <Radiobutton
    id="signin"
    type="radio"
    checked={mode === 'signin'}
    onChange={() => setMode ('signin')}
    />
    <Form onSubmit={onFormSubmit}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username" 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Label htmlFor="password">Password</Label>
      <Input 
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  </SigninContainer>
  )
}

export default Signin