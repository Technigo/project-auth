import React from "react";

export const Register = props => {
  let {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    onClick
  } = props;
  return (
    <form>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      ></input>
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
      <button onClick={onClick}>REGISTER</button>
    </form>
  );
};
