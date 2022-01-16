import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SIGNIN_URL } from '../utils/urls';

import user from '../reducers/user';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  input {
    width: 60%;
    border-radius: 8px;
    border: 1px solid grey;
    padding: 8px;
    align-items: center;
  }

  label {
    padding-top: 8px;
    font-size: 22px;
    width: 63%;
  }

  button {
    width: 150px;
    border-radius: 8px;
    border: 1px solid grey;
    height: 37px;
    margin-top: 40px;
    box-shadow: 2px 2px #000;
    text-transform: uppercase;
    margin-bottom: 30px;
    background: red;
    color: lavenderblush;
    font-weight: 700;
  }

  button:hover {
    cursor: pointer;
    box-shadow: none;
    background: lavenderblush;
    color: red;
    border: 2px solid red;
  }

  p {
    margin: 2px;
    font-size: 10px;
  }
`;

const Wrapper = styled.div`
  border: red solid 4px;
  border-radius: 8px;
  max-width: 70%;
  width: 60%;
  margin: 60px auto 0 auto;
  font-family: 'Dongle', sans-serif;
  background: lavenderblush;
  p {
    margin: 5px;
  }
  div {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 35px;
  }

  div a {
    color: red;
    margin: 0;
    font-size: 22px;
  }
`;

const Title = styled.h1`
  color: red;
  width: 63%;
  padding-top: 20px;
  text-transform: uppercase;
  font-size: 44px;
`;

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  //  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(store => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/main');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    };

    fetch(SIGNIN_URL, options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
            localStorage.setItem(
              'user',
              JSON.stringify({
                userId: data.response.userId,
                username: data.response.username,
                email: data.response.email,
                accessToken: data.response.accessToken,
              })
            );
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setError(data.response));
            setValidationError(data.message);
          });
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={onFormSubmit}>
        <Title>sign in</Title>
        <label htmlFor='username'>username*</label>
        <input
          id='username'
          type='text'
          placeholder='enter username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label>email*</label>
        <input
          type='email'
          placeholder='enter email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor='password'>password*</label>
        <input
          id='password'
          type='password'
          placeholder='enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p>*required fields</p>
        {validationError !== null && (
          <p style={{ fontSize: '21px', color: 'red' }}>{validationError}</p>
        )}
        <button type='submit'>sign in</button>
      </Form>
      <div>
        <Link to='/signup'>Back to sign up</Link>
      </div>
    </Wrapper>
  );
};
export default SignIn;
