import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

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
      body: JSON.stringify({ username, password, email }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <>
      <section>
        <h1>Welcome to our secret API!</h1>
        <h3>Log in or sign up for an account on the secret API</h3>
        <div className="signup-login-container">
          <div>
            <label htmlFor="signup">Create a new account</label>
            <input
              id="signup"
              type="radio"
              checked={mode === "signup"}
              onChange={() => setMode("signup")}
            />
          </div>
          <div>
            <label htmlFor="signin">Log in to your account</label>
            <input
              id="signin"
              type="radio"
              checked={mode === "signin"}
              onChange={() => setMode("signin")}
            />
          </div>
        </div>
        <form onSubmit={onFormSubmit}>
          {/* The Emailaddress only needs to be submitted in signup-mode */}
          {mode === "signup" && (
            <>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
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
          <button type="submit">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>
    </>
  );
};

export default Login;
