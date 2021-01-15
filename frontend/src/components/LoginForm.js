import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import {LoginContainer, Title, Login} from '../lib/LoginFormStyle'
import { Button } from '../lib/Button'
import InputField from '../lib/InputField'
import { user } from '../reducer/user'

const LOGIN_URL = 'https://auth-project-api.herokuapp.com/sessions'

export const LoginForm = ( ) => {
  // const { id } = useParams();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
    console.log(loginResponse.accessToken)
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    console.log(loginResponse.userId);
    dispatch(user.actions.setStatusMessage({ statusMessage: 'You are logged in, welcome.' }));
    history.push(`/${loginResponse.userId}/user`);
  };

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }))
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
          throw 'Log-in failed, please try again';
        }
        return res.json();
      })
      .then(data => handleLoginSuccess(data))
      .catch(err => handleLoginFailed(err)); 
  };

    return (
      <LoginContainer>
        <Login>
          <Title>LOGIN</Title>
          <InputField
            title='Username'
            htmlFor='name'
            id='name'
            type='text'
            onChange={setName}
          />
          <InputField
            title='Password'
            htmlFor='password'
            id='password'
            type='password'
            onChange={setPassword}
          />
          <Button title='Sign In' onClickFunc={handleLogin} />
        </Login>
      </LoginContainer>
    )
}