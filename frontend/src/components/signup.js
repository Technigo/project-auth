import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [userData, setUserData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser();
  };

  const createUser = () => {
    fetch(API_URL("signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUserData(json.response);
        setUserCreated(true);
      });
  };

  return (
    <>
      {userCreated ? (
        <StyledForm>
          <p>User {userData.name} created!</p>
          <p>
            Click <Link to="/login">here</Link> to login!
          </p>
        </StyledForm>
      ) : (
        <div>
          <StyledForm onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="usernameInput">username:</label>
            <input
              id="usernameInput"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <label htmlFor="emailInput">email:</label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="passwordInput">password:</label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Create user</button>
          </StyledForm>
        </div>
      )}
    </>
  );
};
