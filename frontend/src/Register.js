import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "./services/authorization";

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState("");
  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();
    const response = await registerUser(name, email, password);
    if (response.success) {
      history.push("/login");
      return;
    }
    setErrorText(response.message);
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
      <button onClick={event => handleRegister(event)}>REGISTER</button>
      {errorText}
    </form>
  );
};
