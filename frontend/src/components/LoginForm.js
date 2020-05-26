import React, { useState } from 'react';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
const SIGNUP_URL = 'http://localhost:8080/users';
const LOGIN_URL = 'http://localhost:8080/sessions';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLoginSuccess = (loginResponse) => {
    // For debugging only
    const statusMessage = JSON.stringify(loginResponse);
    dispatch(user.actions.setLoginResponse({ statusMessage }));

    // Save the login info
    dispatch(
      user.actions.setLoginResponse({ accessToken: loginResponse.accessToken, userId: loginResponse.userId })
    );
    // dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
  };

  const handleLoginFailed = (loginError) => {
    const statusMessage = JSON.stringify(loginError);
    dispatch(user.actions.setLoginResponse({ statusMessage }));

    // Clear login values
    dispatch(user.actions.logout());
  };

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // To log in a user.
  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  if (!accessToken) {
    // If user is logged out, show login form
    return (
      <div>
        <Profile />
        <form>
          <h1>sign up</h1>
          <label>
            name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            email
            <input
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            password
            <input
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit" onClick={handleSignup}>
            Sign-Up
          </button>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    );
  } else {
    // If user is logged in, show profile
    return <Profile />;
  }
};
export default LoginForm;