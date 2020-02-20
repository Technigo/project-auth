import React from "react";

export const Login = props => {
  let { email, setEmail, password, setPassword, onClick } = props;
  return (
    <form>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      ></input>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      ></input>
      <button onClick={onClick}>LOGIN</button>
    </form>
  );
};
