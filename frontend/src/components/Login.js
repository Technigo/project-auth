import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import user from "reducers/user";
import { API_URL } from "utils/constants";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");

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
      body: JSON.stringify({ userName, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.userName));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setErrors(data.response));
          });
        }
      });
  };

  return (
    <>
      <Link to="/"></Link>
      <label htmlFor="signup">Sign Up</label>
      <input
        id="signup"
        type="radio"
        checked={mode === "signup"}
        onChange={() => setMode("signup")}
      />

      <label htmlFor="signin">Sign In</label>
      <input
        id="signin"
        type="radio"
        checked={mode === "signin"}
        onChange={() => setMode("signin")}
      />

      <form onSubmit={onFormSubmit}>
        <label htmlFor="userName">Username:</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
