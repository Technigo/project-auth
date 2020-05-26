import React, { useState } from 'react'
import { Profile } from './Profile'

import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';

const SIGNUP_URL = 'http://localhost:8080/users';
const LOGIN_URL = 'http://localhost:8080/sessions';


export const LoginForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken); //kolla upp

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [URL, setURL] = useState(LOGIN_URL);

  const [loggedInUser, setLoggedInUser] = useState(null);  //OLD

  const handleLoginSuccess = (json) => {
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
      .then((res) => res.json())
      .then((json) => handleLoginSuccess(json)) //setLoggedInUser(json))  run dispatch
      .catch((err) => console.log("error:", err));
  };

  // And return error messages "Something went wrong"
  // Redux
  // Heruku och Netlify

  if (!accessToken) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit" onClick={() => setURL(LOGIN_URL)}>
            Login
          </button>
          <button type="submit" onClick={() => setURL(SIGNUP_URL)}>
            Sign up
          </button>
        </form>

      </div>
    );
  } else {
    return <Profile loggedInUser={loggedInUser} URL={SIGNUP_URL} />
  }

}
