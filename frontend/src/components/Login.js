import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/constants";
import user from "../reducers/user";

const Background = styled.div`
  background: linear-gradient(
    to bottom right,
    rgb(0, 0, 0) 0%,
    rgb(50, 50, 50) 100%
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  font-family: Helvetica Neue;
`;

const BackLink = styled.div`
  background: black;
  color: white;
  align-self: start;
  padding-left: 20px;

  a {
    color: white;
  }
`;

const Title = styled.h1`
  text-align: center;
  width: 700px;
  color: white;
`;

const InputBox = styled.div`
  margin-top: 50px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 40px;
  height: 300px;
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  background: black;
  box-shadow: 2px 2px 15px #6e6e6e;

  input {
    padding: 10px;
    border: none;
    border-radius: 6px;
    margin: 5px;
  }

  label {
    color: white;
    margin: 5px;
    font-weight: bold;
  }

  button {
    margin: 20px 3px;
    padding: 10px;
    border-radius: 50px;
    border: 1px solid white;
    color: white;
    background: black;
  }

  button:hover {
    background: white;
    color: black;
    transition: 0.2s;
    cursor: pointer;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    font-weight: bold;
    transition: 0.3s;
  }
`;

const RadioBox = styled.div`
  margin: 5px;
  padding: 5px;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [mode, setMode] = useState("signup");

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

    fetch(API_URL("signin"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUserName(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUserName(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
            // alert("Username already taken!");
          });
        }
      });
  };

  return (
    <Background>
      {/* <BackLink>
        <Link to="/">To '/'!</Link>
      </BackLink> */}
      <Title>
        Welcome to our special site, please log in to access the secret
        information.
      </Title>
      <InputBox>
        {/* <RadioBox>
          <label htmlFor="signup">Sign up</label>
          <input
            id="signup"
            type="radio"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
          />
          <label htmlFor="signin">Log in</label>
          <input
            id="signin"
            type="radio"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
          />
        </RadioBox> */}
        <FormBox onSubmit={onFormSubmit}>
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
          <button
            type="submit"
            disabled={password.length < 5}
            onClick={onFormSubmit}
          >
            Login
          </button>
        </FormBox>
        <p>
          <i>Not a member?</i>
        </p>
        <Link to="/signup">Sign up here!</Link>
      </InputBox>
    </Background>
  );
};

export default Login;
