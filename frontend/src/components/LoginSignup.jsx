import React, { useState } from "react";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export const LoginSignup = () => {
  const URL = "http://localhost:8080";

  const [showSignup, setShowSignup] = useState(false);
  return (
    <>
      {!showSignup ? <LoginForm URL={URL} /> : <SignUpForm URL={URL} />}

      <button onClick={() => setShowSignup(!showSignup)}>
        {showSignup ? "Login" : "Signup"}
      </button>
    </>
  );
};
