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
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Label = styled.label`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Input = styled.input`
  max-width: 100%;
  margin: 20px auto;
  padding: 7px;
  background-color: transparent;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 22px;
  font-family: 'PT Sans', sans-serif;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
    ::placeholder {
      font-size: 16px;
      color: #cccccc;
    }
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #D9AFD9;
  margin: 20px 0 0 20px;
  border:none;
  border-radius: 8px;
  height: 40px;
  font-weight: 700;
  font-size:18px;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
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