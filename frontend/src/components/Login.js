import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { API_URL } from 'utils/utils';

import user from 'reducers/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('registration');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    };
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setUsername(data.username));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setError('Something went wrong, try again.');
        }
      });
  };

  return (
    <div>
      <h1 className="header">Sign in or Sign up</h1>
      <label htmlFor="registration">Registration</label>
      <input
        className="inputRadio"
        type="radio"
        id="registration"
        checked={mode === 'registration'}
        onChange={() => setMode('registration')}
      />
      <label htmlFor="login">Login</label>
      <input
        className="inputRadio"
        type="radio"
        id="login"
        checked={mode === 'login'}
        onChange={() => setMode('login')}
      />

      <form className="form" onSubmit={onFormSubmit}>
        {/* <label htmlFor="username">Username</label> */}
        <input
          className="input"
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {/* <label htmlFor="password">Password</label> */}
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="button" type="submit">
          Login
        </button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default Login;
