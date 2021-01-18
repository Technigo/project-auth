import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { user } from '../reducer/user';
import { Button } from '../lib/Button';
import InputField from '../lib/InputField';
import { CreateUserContainer, Register, Title } from '../lib/CreateUserStyle';


const SIGNUP_URL = 'https://auth-project-api.herokuapp.com/users';

export const CreateUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); 
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignUpSuccess = (signupResponse) => {
    dispatch(user.actions.setAccessToken(signupResponse.accessToken));
    dispatch(user.actions.setUserId(signupResponse.userId));
    dispatch(user.actions.setUserName(signupResponse.userName));
    setSignupMessage('Your user has been created, please log in to continue')
    setName('');
    setPassword('');
  };

  const handleSignupFailed = (signupError) => {
    dispatch(user.actions.setAccessToken(null));
    setSignupMessage(signupError.message);
    setName('');
    setPassword('');
  }

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Sign-up failed, please try again')
        }
        return res.json();
      })
      .then(data => handleSignUpSuccess(data))
      .catch(err => {
        handleSignupFailed(err)
      });
  }
  
  return (
    <CreateUserContainer>
      <Register key={2}>
        <Title>Create account</Title>
        <p>{signupMessage}</p>
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
        <Button
          title='Sign Up'
          onClickFunc={handleSignup} />
      </Register>
    </CreateUserContainer>
  )
};

