import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "./services/authorization";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState("");
  let history = useHistory();

  const loginUser = event => {
    event.preventDefault();

    fetch("http://localhost:8080/sessions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Your e-mail and/or password was incorrect");
        }
        return res.json();
      })
      .then(({ accessToken }) => {
        if (accessToken) {
          window.localStorage.setItem("accessToken", accessToken);
          history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form>
      <label>Email:</label>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)}></input>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      ></input>
      <button onClick={event => loginUser(event)}>LOGIN</button>
      {errorText}
    </form>
  );
};
