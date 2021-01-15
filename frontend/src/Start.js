import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "user";
import Profile from "Profile";

const USER_URL = "https://modest-hamilton-9de3b4.netlify.app/users";
const LOGIN_URL = "https://modest-hamilton-9de3b4.netlify.app/sessions";

const Start = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: "Login Success!" })
    );
  };

  const handleLoginFail = (loginError) => {
    dispatch(user.actions.setAccessToken({ accesToken: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    fetch(USER_URL, {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          setErrorMessage(json);
        }
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        setErrorMessage("new error");
        console.log(error);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
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
      .catch((error) => {
        handleLoginFail(error);
        console.log(error);
      });
  };
  if (!accessToken) {
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
              type="password"
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
        <div>{errorMessage && <p>{errorMessage.message}</p>}</div>
        <div>{statusMessage && <p>{statusMessage}</p>}</div>
      </>
    );
  } else {
    return <Profile />;
  }
};

export default Start;
