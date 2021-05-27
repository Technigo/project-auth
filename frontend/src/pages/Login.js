import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";

import user from "../reducers/user";

//import { API_URL } from "../reusable/urls";

import "./LoginStyle.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("Checking access token, accessToken");
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="pink-circle"></div>
        <div className="blue-circle"></div>
        <div className="green-circle"></div>
        <form onSubmit={onFormSubmit}>
          <h2>Log in here</h2>
          <input
            className="input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            type="submit"
            onClick={() => setMode("signin")}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
