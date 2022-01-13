import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUserData(json.response);
        console.log(json);
        setUserCreated(true);
      });
  };

  return (
    <>
      {userCreated ? (
        <div>
          <p>
            User {userData.name} created with an id {userData.id}!
          </p>
          <p>
            Click <Link to="/login">here</Link> to login!
          </p>
        </div>
      ) : (
        <div>
          <form onSubmit={(event) => handleSubmit(event)}>
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
          </form>
        </div>
      )}
    </>
  );
};
