import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "../reducers/user";
import { UserProfile } from "./UserProfile";

const SIGNUP_URL = "http://localhost:8080/users";
//change to Heroku-url
const LOGIN_URL = "http://localhost:8080/sessions";
//change to Heroku-url

export const Login = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Sending the response from both the users and login urls to the redux store
  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: "Login success!" })
    );
  };

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  // Handle sign up
  const handleSignup = (event) => {
    event.preventDefault();
    // send data to backend, for saving in DB
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw "Signup failed";
        }
        return;
        res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // Handle log in
  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw "Login failed";
        }
        return;
        res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  if (accessToken) {
    return (
      <>
        <UserProfile />
      </>
    )
  };

  return (
    <div>
      <form>
        <h1>Sign Up</h1>
        <label>
          name:
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          password:
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSignup}>
          SIGN UP
        </button>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
