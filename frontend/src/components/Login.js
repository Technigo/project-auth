import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "../reducers/user";
// import { Container } from "../styled-components/LoginStyling";

const SIGNUP_URL = "http://localhost:8080/users";
const LOGIN_URL = "http://localhost:8080/sessions";

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
    dispatch(user.actions.setUserId({ userId: loginResponse.id }));
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
    // setName("");
    // setPassword("");
    // send data to backend, for saving in DB
    fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Signup failed. Please enter a valid name and password."
          );
        }
        return res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // Handle log in
  const handleLogin = (event) => {
    event.preventDefault();
    //setName("");
    //setPassword("");

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed. Please try again."); // throw redirects us to .catch
        }
        return res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  if (accessToken) {
    return <></>;
  }

  return (
    <section>
      <form>
        <h1>Sign Up/Login</h1>
        <label> Name: </label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label> Password:</label>
        <input
          placeholder="Min length 5 characters"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="button-container">
          <button type="submit" onClick={handleSignup}>
            Sign up
          </button>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </section>
  );
};
