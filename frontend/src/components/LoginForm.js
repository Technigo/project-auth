import React, { useState } from 'react'
import { Profile } from './Profile'


const SIGNUP_URL = 'http://localhost:8080/users';
const LOGIN_URL = 'http://localhost:8080/sessions';


export const LoginForm = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [URL, setURL] = useState(LOGIN_URL);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setLoggedInUser(json))
      .catch((err) => console.log("error:", err));
  };

  // And return error messages "Something went wrong"
  // Redux
  // Heruku och Netlify

  if (loggedInUser === null) {
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
  } else if (loggedInUser.accessToken) {
    return <Profile loggedInUser={loggedInUser} URL={SIGNUP_URL} />;
  } else {
    return <p>Try again</p>
  }

}
