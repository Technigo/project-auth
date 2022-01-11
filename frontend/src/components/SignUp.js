import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import user from '../reducers/user';

import { SIGNUP_URL } from '../utils/urls';

const Title = styled.h1`
  color: red;
`;

const Wrapper = styled.div`
  background-color: pink;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //   const fetchUser = () => {
  //     fetch('https://user-signup-sofia-aleksa.herokuapp.com/signup')
  //       .then(res => res.json())
  //       .then(data => setUsername(data));
  //   };
  const handleLoginSuccess = loginResponse => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Login Success' }));
  };

  const handleLoginFailed = loginError => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const onSignUpSubmit = event => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => setUsername(data));
  };

  return (
    <Wrapper>
      <Title>sign up</Title>
      <form onSubmit={onSignUpSubmit}>
        <label>username</label>
        <input
          type='text'
          placeholder='enter username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label>password</label>
        <input
          type='password'
          placeholder='enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>register</button>
      </form>
      <p>already a member?</p>
      <Link to='/'>Sign in</Link>
    </Wrapper>
  );
};

export default SignUp;
