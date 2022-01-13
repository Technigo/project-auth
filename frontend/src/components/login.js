import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";
import { API_URL } from "../utils/constants";

const StyledForm = styled.form`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #0066cc;
  padding: 20px;
  border-radius: 5px;
  font-weight: 500;
`;

const StyledButton = styled.button`
  width: auto;
  height: 35px;
  padding: 10px;
  background-color: #fff;
  color: #000;

  border-radius: 4px;
  border: none;
`;

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    fetch(API_URL("login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          batch(() => {
            dispatch(user.actions.setUserId(json.response.userId));
            dispatch(user.actions.setUsername(json.response.username));
            dispatch(user.actions.setAccessToken(json.response.accessToken));
            dispatch(user.actions.setError(null));
          });
          navigate("/");
        } else {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(json.response));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <StyledForm onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="usernameInput">username:</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="passwordInput">password:</label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <StyledButton type="submit">Log in</StyledButton>
      </StyledForm>
      <p>
        {" "}
        Don't have the username? Please signup <Link to="/signup">
          here!{" "}
        </Link>{" "}
      </p>
    </>
  );
};
