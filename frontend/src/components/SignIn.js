import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser, riddles } from "../reducers/users";

export const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onUserSubmit = (event) => {
    event.preventDefault();
    dispatch(signinUser(name, password));
  };
  const token = useSelector((state) => state.users.accessToken);
  console.log(token);
  const getRiddles = () => {
    dispatch(riddles(token));
  };

  // const auth = () => {
  //   let navigate = useNavigate();
  //   if (accessToken) {
  //     navigate("/riddles");
  //   } else {
  //     throw error;
  //   }
  // };

  return (
    <>
      <form onSubmit={onUserSubmit}>
        <h1>This is the sign in page</h1>
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
      <button onClick={getRiddles}>This is the riddles</button>
    </>
  );
};
