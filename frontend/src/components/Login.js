import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/utils";
import user from "reducers/user";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // Mode varable would be login or register - depend on endpoint (loging or register)- Put default to login
  const [mode, setMode] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    };
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      // .then((data) => console.log(data));
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setName(data.response.name));
            dispatch(user.actions.setId(data.response.id));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setName(null));
            dispatch(user.actions.setId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };
  return (
    <>
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
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
