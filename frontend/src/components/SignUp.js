import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import styled from 'styled-components';

import user from '../reducers/user';
// import Alert from './Alert';

import { SIGNUP_URL } from '../utils/urls';

const Title = styled.h1`
  color: red;
`;

const Wrapper = styled.div`
  background-color: pink;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    const dataToSubmit = {
      email,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    };

    fetch(SIGNUP_URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          new Swal({
            title: 'User created',
            content: 'el',
          }).then(function () {
            navigate('/signin');
          });
        } else {
          batch(() => {
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <Wrapper>
      <Title>sign up</Title>
      <form onSubmit={onFormSubmit}>
        <label>username</label>
        <input
          type='text'
          placeholder='enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>email</label>
        <input
          type='text'
          placeholder='enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          type='password'
          placeholder='enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>register</button>
      </form>
      {/* <div>
        <p>
          You're now a member! 🎉 Click <Link to='/signin'> here </Link> to
          login
        </p>
      </div> */}
      <p>Already a member?</p>
      <Link to='/signin'>Sign in</Link>
    </Wrapper>
  );
};

export default SignUp;
