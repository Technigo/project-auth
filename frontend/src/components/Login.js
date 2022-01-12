import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import user from "../reducers/user";
import { API_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SignUpInContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");

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
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          alert(data.response);
        }
      });
  };

  return (
    <LoginContainer>
      <Link to="/"></Link>
      <Form onSubmit={onFormSubmit}>
        <h1>{mode === "signup" ? "Create Account" : "Log in"}</h1>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          autoComplete="off"
          placeholder={mode === "signup" && "JaneDoe"}
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder={mode === "signup" && "Minimum 5 characters"}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button
          type="submit"
          disabled={password.length < 5 && mode === "signup"}
        >
          Submit
        </button>
      </Form>

      <SignUpInContainer>
        <label htmlFor="signin">Sign In</label>
        <input
          id="signin"
          type="radio"
          checked={mode === "signin"}
          onChange={() => setMode("signin")}
        />

        <label htmlFor="signup">Sign Up</label>
        <input
          id="signup"
          type="radio"
          checked={mode === "signup"}
          onChange={() => setMode("signup")}
        />
      </SignUpInContainer>
    </LoginContainer>
  );
};

export default Login;

// lägga till not yet an account innan signup-radiobutton?
