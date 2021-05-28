import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./RegisterStyle.css";
import user from "../reducers/user";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

    const API_REGISTER = "https://week20-project-auth.herokuapp.com/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    };

    fetch(API_REGISTER, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("if");
          batch(() => {
            dispatch(user.actions.setUsername(data.username));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          console.log("else");
          dispatch(user.actions.setErrors(data));
        }
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form-container">
          <div className="pink-circle"></div>
          <div className="blue-circle"></div>
          <div className="green-circle"></div>
          <form className="form" onSubmit={onFormSubmit}>
            <h2>Sign up here</h2>
            <input
              className="input"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signup-button" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div className="member-container">
          <p>
            Already a member?{" "}
            <Link to="/login">
              <b>Log in</b>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
