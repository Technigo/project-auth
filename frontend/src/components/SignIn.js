import React, { useState } from "react";
import { InputText } from "./InputText.js";

export const SignIn = ({ setSignedIn }) => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/sessions`, {
      method: "POST",
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.accessToken) {
          localStorage.setItem("accessToken", json.accessToken);
          localStorage.setItem("userID", json.id);
          localStorage.setItem("signedIn", JSON.stringify(true));
          setSignedIn(JSON.parse(localStorage.getItem("signedIn")));
        } else if (!json.signUpSuccessful) {
          setLoginFailed(true);
        }
      });

    //Empty inputValue object.
    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Sign In</h1>

      <InputText
        name="email"
        label="Email"
        type="email"
        setInputValue={setInputValue}
        minLength="3"
      />
      <InputText
        name="password"
        label="Password"
        type="password"
        setInputValue={setInputValue}
        minLength="6"
      />

      {loginFailed && <span className="error-msg">Login failed</span>}

      <button>Sign in</button>
    </form>
  );
};
