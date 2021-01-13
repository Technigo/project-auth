import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

const Login = ({ LOGIN_URL }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentials = (credentials) => {
    dispatch(user.actions.setAccessToken({ accessToken: credentials.accessToken }));
    dispatch(user.actions.setUserId({ userId: credentials.userId }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log({ email, password });
    console.log(LOGIN_URL);
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line
          throw "Signup failed";
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        handleCredentials(json);
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error(error))
  };

  return (
    <section>
      <h1>Welcome to Max and Sandrine's app!</h1>
      <p>Already a member? Please enter your credentials below.</p>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            required
            minLength="5"
            type="email"
            value={email}
            name="email"
            onChange={event => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input
            required
            minLength="5"
            type="text"
            value={password}
            onChange={event => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  )
};

export default Login;