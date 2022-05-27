import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { API_URL } from "utils/utils";

import user from "reducers/user";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("register");
  const [errorCheck, setErrorCheck] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    fetch(API_URL(value), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setUserName(data.response.username));
            dispatch(user.actions.setError(null));
            setErrorCheck("User created successfully");
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
            setErrorCheck(data.response);
          });
        }
      });
  };
  return (
    <>
      <div className="main-container">
        <div className="login-top">
          <Link to="/">Link to /</Link>
          <label htmlFor="register">Register</label>
          <input
            type="radio"
            id="register"
            checked={value === "register"}
            onChange={() => setValue("register")}
          />
          <label htmlFor="login">Login</label>
          <input
            type="radio"
            id="login"
            checked={value === "login"}
            onChange={() => setValue("login")}
          />
        </div>
        <div className="form-container">
          <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
