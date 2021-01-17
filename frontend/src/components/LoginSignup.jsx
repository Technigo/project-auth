import React, { useState } from "react";
import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Status } from "./Status";

import { SecondaryButton } from "../lib/SecondaryButton";

export const LoginSignup = () => {
  const URL = "http://localhost:8080";
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const [showSignup, setShowSignup] = useState(false);

  if (accessToken) return <></>;

  return (
    <>
      {!showSignup ? <LoginForm URL={URL} /> : <SignUpForm URL={URL} />}

      <SecondaryButton
        text={showSignup ? "Login" : "Sign up"}
        onClick={() => setShowSignup(!showSignup)}
      />

      <Status />
    </>
  );
};
