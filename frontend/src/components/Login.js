import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { API_URL } from '../utils/constant';
import user from '../reducers/user';

const SigninWrapper = styled.div`
  background-color: #2e925b;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  font-family: 'Rosarivo', serif;
`;

const WelcomeMessage = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 50%;
`;
const WelcomeText = styled.p`
  font-size: 24px;
`;

const FormWrapper = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioWrapper = styled.form`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;
const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  min-width: 450px;
  min-height: 750px;
  border-radius: 20px;
`;
const InputField = styled.input`
  margin: 3px;
  border-radius: 5px;
  min-width: 200px;
`;
const InputField2 = styled.input`
  margin-bottom: 30px;
  position: relative;
`;
const Username = styled.label`
  align-self: flex-start;
  margin-left: 130px;
`;

const Password = styled.label`
  align-self: flex-start;
  margin-left: 130px;
`;
const Button = styled.button`
  min-width: 200px;
  background-color: #505168;
  color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  height: 40px;
  &:hover {
    background: #fff;
    box-shadow: 0px 2px 10px 5px #97b1bf;
    color: #000;
  }
`;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signup');

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <SigninWrapper>
      <WelcomeMessage>
        <h1>Welcome To Happy Thoughts!</h1>
        <WelcomeText>Make your thoughts come through...</WelcomeText>
      </WelcomeMessage>

      <FormWrapper>
        <InputForm onSubmit={onFormSubmit}>
          <WelcomeText>
            <h4>Add your credentials</h4>
          </WelcomeText>
          <RadioWrapper>
            <label htmlFor="signin">Sign up</label>
            <input
              id="signup"
              type="radio"
              checked={mode === 'signup'}
              onChange={() => setMode('signup')}
            />

            <label htmlFor="signin">Sign in</label>
            <input
              id="signin"
              type="radio"
              checked={mode === 'signin'}
              onChange={() => setMode('signin')}
            />
          </RadioWrapper>

          <Username htmlFor="username">Username</Username>
          <InputField
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Password htmlFor="password">Password</Password>
          <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Submit</Button>
        </InputForm>
      </FormWrapper>
    </SigninWrapper>
  );
};

export default Login;
