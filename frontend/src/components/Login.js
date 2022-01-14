import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import user from '../reducers/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signup');
  const [error, setError] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* const error = useSelector((store) => store.user.error); */

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setError('Invalid login or password');
        }
      });
  };

  return (
    <div className='form-container'>
      {mode === 'signin' && (
        <div>
          <div className='label-container'>
            <label className='label-button' htmlFor='signup'>
              Sign up
            </label>
            <input
              id='signup'
              type='radio'
              checked={mode === 'signup'}
              onChange={() => setMode('signup')}
            />
          </div>
          <h1>Sign In</h1>
        </div>
      )}
      {mode === 'signup' && (
        <div>
          <div className='label-container'>
            <label className='label-button' htmlFor='signin'>
              Sign in
            </label>
            <input
              id='signin'
              type='radio'
              checked={mode === 'signin'}
              onChange={() => setMode('signin')}
            />
          </div>
          <h1>Sign Up</h1>
        </div>
      )}

      <form className='fields-container' onSubmit={onFormSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/*  {error && <p>Whoops! Something went wrong. Try again!</p>} */}
        {/* {error ? <p>{error}</p> : ''} */}

        <button type='submit'>Submit</button>
        <p> {error}</p>
      </form>
    </div>
  );
};

export default Login;
