import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";

export const SignUpForm = ({ URL }) => {
  const SIGNUP_URL = `${URL}/users`;

  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupSuccess = (signupResponse) => {
    console.log(signupResponse);
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: signupResponse.message,
      })
    );
  };

  const handleSignupFailed = (signupError) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: signupError }));
  };

  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      fetch(SIGNUP_URL, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw "Signup Failed";
          }
          return res.json();
        })
        .then((json) => handleSignupSuccess(json))
        .catch((err) => handleSignupFailed(err));
    } else {
      dispatch(
        user.actions.setStatusMessage({
          statusMessage: "password don't match",
        })
      );
    }
  };
  if (accessToken) {
    return <></>;
  }
  // If user is logged out, show login form
  return (
    <section>
      <form>
        <h1>Sign Up:</h1>
        <label>
          name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          eMAIL
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          password
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          confirm password
          <input
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSignup}>
          Sign-Up
        </button>
      </form>
    </section>
  );
};
export default SignUpForm;
