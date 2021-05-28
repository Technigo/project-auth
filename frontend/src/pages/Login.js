import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import user from "../reducers/user";

import "./LoginStyle.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const API_LOGIN = "https://week20-project-auth.herokuapp.com/signin";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_LOGIN, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      });
  };

  return (
    <div className='form-wrapper'>
      <div className='form-container'>
        <div className='pink-circle'></div>
        <div className='blue-circle'></div>
        <div className='green-circle'></div>
        <form className='form' onSubmit={onFormSubmit}>
          <h2>Log in here</h2>
          <input
            className='input'
            placeholder='Username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='input'
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login-button' type='submit' onClick={onFormSubmit}>
            Log in
          </button>
        </form>
      </div>
      <div className='signup-container'>
        <p>
          Not a member?{" "}
          <Link to='/signup'>
            <b>Sign up</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
