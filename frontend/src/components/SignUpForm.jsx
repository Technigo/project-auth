import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

import { CustomInput } from "../lib/CustomInput";
import { PrimaryButton } from "../lib/PrimaryButton";

export const SignUpForm = ({ URL }) => {
  const SIGNUP_URL = `${URL}/users`;

  const dispatch = useDispatch();
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
    dispatch(
      user.actions.setStatusMessage({ statusMessage: signupError.message })
    );
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
            throw new Error("Signup Failed");
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

  // If user is logged out, show login form
  return (
    <section>
      <form>
        <h1>Sign Up:</h1>
        <CustomInput
          required
          placeholder={"name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        <CustomInput
          required
          placeholder={"confirm password"}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <PrimaryButton
          small
          type="submit"
          title="Signup"
          onClick={handleSignup}
        />
      </form>
    </section>
  );
};
export default SignUpForm;
