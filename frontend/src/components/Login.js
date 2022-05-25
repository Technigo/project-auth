import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { API_URL } from 'utils/utils';

import user from 'reducers/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [mode, setMode] = useState('registration');

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
      body: JSON.stringify({ username, password }),
    };
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setUserame(data.username));
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
        }
        // console.log(data);
      });
  };

  return (
    <div>
      <h1>Login page</h1>
      <Link to="/">LINK TO /</Link>
      <label htmlFor="registration">Registration</label>
      <input
        type="radio"
        id="registration"
        checked={mode === 'registration'}
        onChange={() => setMode('registration')}
      />
      <label htmlFor="login">Login</label>
      <input
        type="radio"
        id="login"
        checked={mode === 'login'}
        onChange={() => setMode('login')}
      />

      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* <Link to="/profile">
          <button type="submit">Login</button>
        </Link> */}
        <button type="submit">Login</button>
        {/* <button type="submit" onClick={() => setMode('login')}>Login</button> */}

        {/* <Link to="/registration">
          <button type="button">Register</button>
        </Link> */}
      </form>
    </div>
  );
};

export default Login;
