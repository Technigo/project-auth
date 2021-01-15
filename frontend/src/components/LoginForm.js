import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { LoginContainer, Title, Login, LoginErrorMessage } from '../lib/LoginFormStyle'
import { Button } from '../lib/Button'
import InputField from '../lib/InputField'
import { user } from '../reducer/user'

const LOGIN_URL = 'https://auth-project-api.herokuapp.com/sessions'

export const LoginForm = ( ) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken(loginResponse.accessToken));
    console.log(loginResponse.accessToken)
    dispatch(user.actions.setUserId(loginResponse.userId));
    console.log(loginResponse.userId);
    dispatch(user.actions.setUserName(loginResponse.userName));
    console.log({ loginResponse })
    dispatch(user.actions.setStatusMessage({ statusMessage: 'You are logged in, welcome.' }));
    history.push(`/${loginResponse.userId}/user`);
  };

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError.errorMessage }));
    setName('');
    setPassword('');
    setErrorMessage();
   };

  // 
  // } 

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {'Content-type': 'application/json'},
    })
      .then(res => {
        if (!res.ok) {
          throw {errorMessage: 'Log-in failed, please try again'};
        }
        return res.json();
      })
      .then(data => handleLoginSuccess(data))
      .catch(err => {handleLoginFailed(err);
        setErrorMessage();
      })
  };
 


    return (
      <LoginContainer>
        <Login>
          <Title>LOGIN</Title>
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
          {errorMessage && <p>{errorMessage}</p>}
        </Login>
      </LoginContainer>
    )
}