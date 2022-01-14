<<<<<<< HEAD
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"
=======
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
>>>>>>> 9310488326d3a8a8886f6853d33ac7b2b7c5a352

import { API_URL } from "../utils/constants";
import user from "../reducers/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setError("Sorry, this is an invalid username or password");
        }
      });
  };

  console.log(mode)

  return (
    <>
<<<<<<< HEAD
      {mode === "signin" ? (
        <button type="submit" onClick={() => setMode("signup")}>
          Sign up
        </button>
      ) : (
        <button type="submit" onClick={() => setMode("signin")}>
          Sign in
        </button>
      )}

      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
=======
      <div className="main-container">
        <div className="btn-container">
          {mode === "signin" ? (
            <button
              className="sign-btn"
              type="submit"
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          ) : (
            <button
              className="sign-btn"
              type="submit"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          )}
        </div>
        {/* <label htmlFor="signup">Signup</label>
      <input
        id="signup"
        type="radio"
        checked={mode === "signup"}
        onChange={() => setMode("signup")}
      />
      <label htmlFor="signin">Signin</label>
      <input
        id="signin"
        type="radio"
        checked={mode === "signin"}
        onChange={() => setMode("signin")}
      /> */}
        <div className="form-container">
          <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
>>>>>>> 9310488326d3a8a8886f6853d33ac7b2b7c5a352

            <p>{error}</p>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
