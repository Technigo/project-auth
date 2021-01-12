import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user } from '../reducers/user';

const URL = 'http://localhost:8080/users';

export const SignUp = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLoginSuccess = (loginResponse) => {
    dispatch(user.actions.setAccessToken({ accessToken: loginResponse.accessToken }));
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setStatusMessage({ statusMessage: 'Successful login' }));
  }

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const handleSubmit = event => {
    event.preventDefault()

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
      headers: { 'Content-Type': 'application/json' }
    })

      .then((res) => {
        if (!res.ok) {
          throw 'Failed to sign up';
        }
        return res.json();
      })
    .then((json) => handleLoginSuccess(json))
    .catch((err) => handleLoginFailed(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <label>
          Name:
        <input
            required
            type="text"
            value={name}
            onChange={event => setName(event.target.value)} />
        </label>
        <label>
          Email:
        <input
            required
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
        <input
            required
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Sign up!</button>
      </form>
    </div>
  )
}                                              
                                                                                  