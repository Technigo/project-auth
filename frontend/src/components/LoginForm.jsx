import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

import { CustomInput } from "../lib/CustomInput";
import { PrimaryButton } from "../lib/PrimaryButton";

export const LoginForm = ({ URL }) => {
  const LOGIN_URL = `${URL}/sessions`;

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
    );
    dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
    dispatch(user.actions.setName({ name: loginResponse.name }));
    dispatch(user.actions.setStatusMessage({ statusMessage: "Login Success" }));
  };

  const handleLoginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: loginError.message })
    );
  };

  // To sign up a user.
  const handleLogin = (event) => {
    event.preventDefault();

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login Failed");
        }
        return res.json();
      })
      .then((json) => handleLoginSuccess(json))
      .catch((err) => handleLoginFailed(err));
  };

  // If user is logged out, show login form
  return (
    <section>
      <form>
        <h1>Login:</h1>
        <CustomInput
          required
          placeholder={"email"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <CustomInput
          required
          placeholder={"password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <PrimaryButton
          small
          type="submit"
          title="Login"
          onClick={handleLogin}
        />
      </form>
    </section>
  );
};
export default LoginForm;
