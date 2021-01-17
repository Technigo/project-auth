import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {LoginContainer, Title, Login} from '../lib/LoginFormStyle';
import { Button } from '../lib/Button';
import InputField from '../lib/InputField';
import { user } from '../reducer/user';

const LOGIN_URL = 'https://auth-project-api.herokuapp.com/sessions';

export const LoginForm = ( ) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const status = useSelector(store => store.user.login.statusMessage);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken(loginResponse.accessToken));
    dispatch(user.actions.setUserId(loginResponse.userId));
    dispatch(user.actions.setUserName(loginResponse.userName));
    dispatch(user.actions.setStatusMessage({ statusMessage: 'You are logged in, welcome.' }));
    history.push(`/${loginResponse.userId}/user`);
  };

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
    setName('');
    setPassword('');
   };

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {'Content-type': 'application/json'},
    })
      .then(res => {
        if (!res.ok) {
          throw 'Login failed, please try again';
        }
        return res.json();
      })
      .then(data => handleLoginSuccess(data))
      .catch(err => handleLoginFailed(err))
  };
 
    return (
      <LoginContainer>
        <Login key={2}>
          <Title>LOGIN</Title>
          <p>{status}</p>
          <InputField
            required
            title='Username'
            htmlFor='name'
            id='name'
            value={name}
            aria-label='Write your username here'
            type='text'
            onChange={setName}
          />
          <InputField
            required
            title='Password'
            htmlFor='password'
            id='password'
            value={password}
            aria-label='Write your password here'
            type='password'
            onChange={setPassword}
          />
          <Button title='Sign In' onClickFunc={handleLogin} />
          <UserStatus />
        </Login>
      </LoginContainer>
    )
};