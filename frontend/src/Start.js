import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "user";

const Start = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: "Login Success!" })
    );
  };

  const handleLoginFail = () => {};

  const handleSignUp = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUsername("");
        setPassword("");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/sessions", {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw "Login failed";
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        handleLoginSuccess(json);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>hi</h1>
      <form>
        <label>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </label>
        <button type="submit" onClick={handleSignUp}>
          Sign up
        </button>
        <button type="submit" onClick={handleLogin}>
          Log in
        </button>
      </form>
    </>
  );
};

export default Start;
