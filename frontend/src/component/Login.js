import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

import { API_URL } from "../utils/url";
import user from "../reducers/user";
import order from "../reducers/order";

const Login = () => {
  const [username, setUsername] = useState("");
  // const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [errorMessage, setErrorMessage] = useState(null);

  // const email = useSelector((store) => store.user.email)
  // const message = useSelector((store) => store.order.message);
  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);
  console.log(error);

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
      body: JSON.stringify({ username, password, email, message }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setMessage(data.message));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setMessage(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
            setErrorMessage(data.message);
          });
        }
      });
  };

  return (
    <>
      <label htmlFor="signup">Signup</label>
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
      />
      <form onSubmit={onFormSubmit}>
        <p> User Name </p>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <p> Password </p>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p> email </p>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <p> order </p>
        <input
          id="order"
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Submit</button>
        {errorMessage !== null && <p>{error.message}</p>}
      </form>
    </>
  );
};

export default Login;
