import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import styled from 'styled-components';

import user from '../reducers/user';

import { SIGNUP_URL } from '../utils/urls';

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

    width: 63%;
    font-size: 22px;
  }

  button {
    width: 150px;
    border-radius: 8px;
    border: 2px solid grey;
    height: 37px;
    margin-top: 40px;
    box-shadow: 2px 2px #000;
    text-transform: uppercase;
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

const Title = styled.h1`
  color: red;
  width: 63%;
  padding-top: 20px;
  text-transform: uppercase;
  font-size: 44px;
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
    font-size: 22px;
    line-height: 14px;
  }
  div a {
    color: red;
    margin: 0;
  }
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    };

    fetch(SIGNUP_URL, options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          new Swal({
            title: 'Congratulations! User created 😻',
          }).then(function () {
            navigate('/signin');
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
        <Title>sign up</Title>
        <label>username*</label>
        <input
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

        <label>password*</label>
        <input
          type='password'
          placeholder='enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {password && password.length < 5
          ? 'password must be over 5 characters'
          : ''}

        <button type='submit'>register</button>
        <p>*required fields</p>
        {validationError !== null && (
          <p style={{ fontSize: '21px', color: 'red' }}>{validationError}</p>
        )}
      </Form>

      <div>
        <p>Already a member?</p>
        <Link to='/signin'>Sign in</Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;
