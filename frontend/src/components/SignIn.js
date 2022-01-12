import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { userSignUpOrLogIn } from "../reducers/users";

export const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.accessToken);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (token) {
      navigate("/riddles");
    }
  }, [token, navigate]);
  const onUserSubmit = (event) => {
    event.preventDefault();
    dispatch(userSignUpOrLogIn(name, password, mode));
  };

  return (
    <div className="container">
      <div className="button-align">
        <div>
          <label htmlFor="signup">Signup</label>
          <input
            id="signup"
            type="radio"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
          />
        </div>
        <div>
          <label htmlFor="signin">Signin</label>
          <input
            id="signin"
            type="radio"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
          />
        </div>
      </div>
      <form onSubmit={onUserSubmit} className="signin-form">
        {mode === "signin" && <h2>Sign in</h2>}
        {mode === "signup" && <h2>Sign up</h2>}
        <input
          type="text"
          placeholder="username"
          className="input-field"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input-field"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {mode === "signin" && (
          <button className="submit-button" type="submit">
            Sign in
          </button>
        )}
        {mode === "signup" && (
          <button className="submit-button" type="submit">
            Sign up
          </button>
        )}
      </form>
      {error && <h1>{error.response}</h1>}
    </div>
  );
};
