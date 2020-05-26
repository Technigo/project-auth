import React, { useState } from 'react'
import { Profile } from './Profile'


const SIGNUP_URL = 'http://localhost:8080/users';

const LOGIN_URL = 'http://localhost:8080/sessions';


export const LoginForm = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [URL, setURL] = useState(LOGIN_URL);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = (event, url) => {
    event.preventDefault();
    // setName("Olle")
    // setPassword("olle")
    console.log("submit")
    console.log(url)

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setLoggedInUser(json))
      .catch((err) => console.log("error:", err));
  };


  // handleSubmit()

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
  } else {
    return <Profile loggedInUser={loggedInUser} />;
  }

}
