import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { users, createUser } from "../reducers/users";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onUserSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(name, password));
  };

  return (
    <form onSubmit={onUserSubmit}>
      <h1>This is the sign up page</h1>
      <input
        type="text"
        placeholder="username"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
