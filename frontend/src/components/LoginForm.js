import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import {LoginContainer, Title, Login} from '../lib/LoginFormStyle'
import Button from '../lib/Button'
import InputField from '../lib/InputField'
import { user } from '../reducer/user'

const LOGIN_URL = 'https://auth-project-api.herokuapp.com/sessions'

export const LoginForm = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (event) => {
    console.log('yes')  
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {'Content-type': 'application/json'},
    })
      .then(res => res.json())
      .then(data => {
        dispatch(user.actions.setAccessToken(data.accessToken));
        console.log(data.accessToken)
        dispatch(user.actions.setUserId(data.userId));
        console.log(data.userId);
      })
      history.push("/:id/user");
  }

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