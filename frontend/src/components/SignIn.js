import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { userSignUpOrLogIn } from "../reducers/users";

export const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.accessToken);

  useEffect(() => {
    if (token) {
      navigate("/riddles");
    }
  }, [token, navigate]);
  const onUserSubmit = (event) => {
    event.preventDefault();
    dispatch(userSignUpOrLogIn(name, password, mode));
  };

  return (
    <>
      <div>
        <Link to="/">To '/' !</Link>
      </div>
      <label htmlFor="signup">Signup</label>
      <input
        id="signup"
        type="radio"
        checked={mode === "signup"}
        onChange={() => setMode("signup")}
      />
      <label htmlFor="signin">Signin</label>
      <input
        id="signin"
        type="radio"
        checked={mode === "signin"}
        onChange={() => setMode("signin")}
      />
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
    </>
  );
};
