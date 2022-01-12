import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from 'utils/url';
import user from './reducers/user';

const Login = () => {
  const [username, setUsername] = UseState('');
  const [password, setPassword] = UseState('');
  const [mode, setMode] = useState('signup');

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL('mode'), options)
      .then((res) => res.json)
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  return (
    <>
      <div>
        <Link to="/main">to '/main' !</Link>
      </div>
      <label htmlFor="signup">Sign up</label>
      <input
        id="signup"
        type="radio"
        checked={mode === 'signup'}
        onChange={() => setMode(signup)}
      />
      <label htmlFor="signin">Sign in</label>
      <input
        id="signin"
        type="radio"
        checked={mode === 'signin'}
        onChange={() => setMode(signin)}
      />

      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
