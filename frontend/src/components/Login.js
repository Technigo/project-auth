import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/utils';

import { user } from 'reducers/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('register');
  const [loginError, setLoginError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      console.log('User is logged in');
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password: password }),
    };

    const url = mode === 'register' ? `${API_URL}/register` : `${API_URL}/login`;

    // const url = mode === 'register' ? API_URL('register') : API_URL('login');

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.userId) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.name));
            dispatch(user.actions.setError(null));
          });
          navigate('/');
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
            setLoginError(data.response);
          });
        }
      })
      .catch((error) => {
        console.log('Login error', error);
        batch(() => {
          dispatch(user.actions.setError('Something went wrong'));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUserName(null));
          setLoginError('Something went wrong');
        });
      });
  };

  return (
    <>
      <section>
        <div className="form-container">
          <h1>{mode === 'register' ? 'Register' : 'Login'} page</h1>
          <div className="radio-container">
            <label htmlFor="register">Register</label>
            <input
              type="radio"
              id="register"
              checked={mode === 'register'}
              onChange={() => setMode('register')}
            />
            <label htmlFor="login">Login</label>
            <input
              type="radio"
              id="login"
              checked={mode === 'login'}
              onChange={() => setMode('login')}
            />
          </div>

          <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {loginError !== null && <p className="login-error">{loginError}</p>}

            <div className="button-container">
              <button type="submit">{mode === 'register' ? 'Sign up' : 'Login'}</button>
            </div>
          </form>
        </div>
        </section>
        </>
    )
}
export default Login;
     
