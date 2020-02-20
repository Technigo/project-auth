import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

  const addUser = event => {
    event.preventDefault();

    //POST method to create new user
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(({ accessToken }) => {
        if (accessToken) {
          history.push("/login");
        }
      });
  };

  return (
    <form>
      <label>Name:</label>
      <input type="text" value={name} onChange={event => setName(event.target.value)}></input>
      <label>Email:</label>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)}></input>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      ></input>
      <button onClick={event => addUser(event)}>REGISTER</button>
    </form>
  );
};
