import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "./services/authorization";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState("");
  const history = useHistory();

  const handleLoginUser = async event => {
    event.preventDefault();
    const response = await loginUser(email, password);
    if (response.success) {
      history.push("/");
      return;
    }
    setErrorText(response.message);
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
      <button onClick={event => handleLoginUser(event)}>Login</button>
      {errorText}
      <button onClick={() => history.push("/register")}>Sign up for an account</button>
    </form>
  );
};
