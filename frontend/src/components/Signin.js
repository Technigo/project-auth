import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";

import { API_URL } from '../utils/constants';
import user from '../reducers/user';

//styled components
const SigninContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
	text-align: center;
`;

const Heading = styled.h1`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
  padding-top: 20px;
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
  align-items: start;
  position: relative;
  text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const Label = styled.label`
	text-align: center;
  font-family: 'PT Sans', sans-serif;
`;

const InputEmail = styled.input`
  max-width: 100%;
  margin: 20px 0 0 0;
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

const InputPassword = styled.input`
  max-width: 100%;
  margin: 20px 0px;
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

const CheckboxContainer = styled.div`
  max-width: 100%;
  padding: 0 7px 7px 0;
  `;

const Checkbox = styled.input`
    margin-right: 4px;
  `;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D9AFD9;
  margin: 0 auto;
  margin-top: 10px;
  border:none;
  border-radius: 8px;
  height: 40px;
  width: 50%;
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
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signin');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

const onFormSubmit = (event) => {
  event.preventDefault();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  };

  fetch(API_URL(mode), options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.success) {
      batch(() => { //instead of updating store for each dispatch it will only update ones for all with batch
        dispatch(user.actions.setUserId(data.response.userId));
        dispatch(user.actions.setEmail(data.response.email));
        dispatch(user.actions.setAccessToken(data.response.accessToken));
        dispatch(user.actions.setError(null));
      });
    } else {
      batch(() => {
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setEmail(null));
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setError(data.response));
      });
    }
  });
};

  return (
    <SigninContainer>
      <Heading>Welcome to RJ! </Heading>
      <div>
        <Label htmlFor="signin">Signin</Label>
        <Radiobutton
        id="signin"
        type="radio"
        checked={mode === 'signin'}
        onChange={() => setMode ('signin')}
        />
        <Label htmlFor="signup">Signup</Label>
        <Radiobutton
        id="signup"
        type="radio"
        checked={mode === 'signup'}
        onChange={() => setMode ('signup')}
        />
      </div>
  
      <Form onSubmit={onFormSubmit}>
        {/* <Label htmlFor="email">E-mail</Label> */}
        <InputEmail
          id="email" 
          type="text"
          placeholder="E-mail*" required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <Label htmlFor="password">Password</Label> */}
        <InputPassword 
          id="password"
          type="password"
          placeholder="Password*" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CheckboxContainer>
          <Checkbox type="checkbox" name="checkboxRememberme" value="RememberMe"/>
          <span>Remember me</span> 
        </CheckboxContainer>
        <SubmitButton type="submit"><span>Submit</span></SubmitButton>
        <p>Not a member yet? <Link to="/">Sign up</Link>.</p>
      </Form>
    </SigninContainer>
  );
};

export default Signin;