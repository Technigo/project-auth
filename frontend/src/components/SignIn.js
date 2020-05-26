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
          localStorage.setItem("signedIn", true);
          //Save accessToken to localStorage
          setSignedIn(true);
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
      <h2>Sign In</h2>
      <InputText
        value={inputValue.email}
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        setInputValue={setInputValue}
        minLength="3"
      />
      <InputText
        value={inputValue.password}
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        setInputValue={setInputValue}
        minLength="6"
      />
      <button>Sign in</button>

      {loginFailed && <span>Login failed</span>}

    </form>
  );
};
