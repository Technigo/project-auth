import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';

import {
  BackGround,
  FormWrapper,
  UserInput,
  TextArea,
  RadioWrapper,
  Label,
  RadioButtons,
  ErrorMessage,
  SubmitButton,
  ButtonWrapper,
} from './login_style';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
      // body: JSON.stringify({username, password})
    };
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
            setErrorMessage(data.response);
          });
        }
      });
  };

  return (
    <BackGround >
    <FormWrapper>
      <form onSubmit={onFormSubmit}>
        <UserInput>
          <label htmlFor='username'>Username</label>
          <TextArea
            type='text'
            id='username'
            placeholder='💻 Username' aria-label="Computer"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor='password'>Password</label>
          <TextArea
            type='password'
            id='password'
            placeholder=' 🔑 Password' aria-label="key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </UserInput>
        <RadioWrapper>
        <Label htmlFor='login'>Login</Label>
        <RadioButtons
          type='radio'
          id='login'
          checked={mode === 'login'}
          onChange={() => setMode('login')}
        />
        <Label htmlFor='register'>Register</Label>
        <RadioButtons
          type='radio'
          id='register'
          checked={mode === 'register'}
          onChange={() => setMode('register')}
        />
        </RadioWrapper>

        {setErrorMessage !== null && <ErrorMessage >{errorMessage}</ErrorMessage >}
        <ButtonWrapper>
          <SubmitButton type='submit'>Submit</SubmitButton>
        </ButtonWrapper>
      </form>
    </FormWrapper>
    </BackGround >
  );
};

export default Login;
