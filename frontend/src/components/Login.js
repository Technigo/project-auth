import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";

import user from "reducers/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(null);

  const [mode, setMode] = useState("register");

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
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
            setValidationError(null);
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
            setValidationError(data.response);
          });
        }
      });
  };

  return (
    <section>
      <h1>Sign in or Sign up</h1>
      <div className="radio-container">
        <label htmlFor="register">Register</label>
        <input
          type="radio"
          id="register"
          checked={mode === "register"}
          onChange={() => setMode("register")}
        />
        <label htmlFor="login">Login</label>
        <input
          type="radio"
          id="login"
          checked={mode === "login"}
          onChange={() => setMode("login")}
        />
      </div>
      <form onSubmit={onFormSubmit}>
        <div className="input-field">
          <label htmlFor="username">
            Username
            <span className="required">* </span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">
            Password
            <span className="required">* </span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {validationError !== null && (
          <p className="error-message">{validationError}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Login;
