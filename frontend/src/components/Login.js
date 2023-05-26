import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/urls";
import user from "reducers/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(store => store.user.accessToken);
  const error = useSelector(store => store.user.error);
  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    }
    fetch(API_URL(mode), options)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data)
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      })
  }

  return (
    <>
      <label htmlFor="register">Register</label>
      <input
        type="radio"
        id="register"
        checked={mode === "register"}
        onChange={() => setMode("register")} />
      <label htmlFor="login">Login</label>
      <input
        type="radio"
        id="login"
        checked={mode === "login"}
        onChange={() => setMode("login")} />
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="At least 2 characters"
          value={username}
          minLength="2"
          maxLength="14"
          onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="At least 8 characters"
          value={password}
          minLength="8"
          onChange={e => setPassword(e.target.value)} />
        <button
          type="submit"
          disabled={username.length < 2 || password.length < 8}
        >Submit</button>
      </form>
      {error !== null && mode === "register" && (<p>Sorry, user already exists.</p>)}
      {error !== null && mode === "login" && (<p>Pls make sure that you are a registered user and that you have filled in the correct login information.</p>)}
    </>
  );
}

export default Login;