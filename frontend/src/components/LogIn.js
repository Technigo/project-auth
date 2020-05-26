import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { user } from '../reducers/user';
import { Redirect } from 'react-router-dom';
const LOGIN_URL = "http://localhost:8080/sessions";

export const LogIn = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [logIn, setLogIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLoginSuccess = (loginResponse, name) => {
    // For debugging only
    const statusMessage = JSON.stringify(loginResponse);
    dispatch(user.actions.setStatusMessage({ statusMessage }));

    // Save the login info
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setUserName({ name: loginResponse.name }));
  };

  const handleLoginFailed = (loginError) => {
    const statusMessage = JSON.stringify(loginError);
    dispatch(user.actions.setStatusMessage({ statusMessage }));

    // Clear login values
    dispatch(user.actions.logout());
  };

  const handleLogin = (event) => {
    event.preventDefault();
    
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (!res.ok) {
        setErrorMessage(true)
      } else {
        setErrorMessage(false)
        setLogIn(true)
        return (res.json())
      }
    })
    .then((json) => handleLoginSuccess(json))
    .catch((err) => handleLoginFailed(err));
  };

  if (logIn === false) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            <button type="submit">Log in</button>
          </label>
        </form>
        {errorMessage === true ? <p>Could not log in, try again</p> : null}
      </div>
    )
  } else {
    return <Redirect to='/secrets' />
  }
};