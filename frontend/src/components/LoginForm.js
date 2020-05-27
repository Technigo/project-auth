import React, { useState } from 'react'
import { Profile } from './Profile'

import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
import './loginform.css'

const USERS_URL = 'http://localhost:8080/users';
const SESSION_URL = 'http://localhost:8080/sessions';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [URL, setURL] = useState(USERS_URL);

  const [loggedInUser, setLoggedInUser] = useState(null);  //OLD
  const [errorMessage, setErrorMessage] = useState(null);  //REPLACE

  const handleLoginSuccess = (json) => {
    console.log("handle login")
    setLoggedInUser(json) //REMOVE
    dispatch(
      user.actions.setAccessToken({ accessToken: json.accessToken })
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((json) => handleLoginSuccess(json)) //setLoggedInUser(json))  run dispatch
      .catch((err) => {
        console.log("error:", err)
        setErrorMessage("Failed try again") // Same for login and sign up
      });
  };

  if (!accessToken) {
    return (
      <div>
        <h1>Login or sign up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name&nbsp;
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Password&nbsp;
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit" onClick={() => setURL(SESSION_URL)}>
            Login
          </button>
          <button type="submit" onClick={() => setURL(USERS_URL)}>
            Sign up
          </button>
        </form>
        <p>{errorMessage}</p>
      </div>
    );
  } else {
    return <Profile loggedInUser={loggedInUser} URL={USERS_URL} />
  }
}
