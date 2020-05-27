import React, { useState } from "react";
import { InputText } from "./InputText.js";

export const SignUp = ({ setSignedIn }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpFailed, setSignUpFailed] = useState(false);
  let score = 0;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/users`, {
      method: "POST",
      body: JSON.stringify({
        name: inputValue.name,
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
          setSignUpFailed(true);
        }
      });

    //Empties inputValue object
    setInputValue({
      name: "",
      email: "",
      password: "",
    });
  };

  const scorePassword = (pass) => {
    let counter = 0;
    const regexCap = /[A-Z]/g;
    const regexNum = /[0-9]/g;
    const regexChar = /[$&+,!:;=?@#_]/g;

    if (pass.length > 4) {
      counter++;
    }

    if (pass.search(regexCap) > -1) {
      counter++;
    }

    if (pass.search(regexNum) > -1) {
      counter++;
    }

    if (pass.search(regexChar) > -1) {
      counter++;
    }

    return counter;
  };

  const checkPassStrength = (pass) => {
    score = scorePassword(pass);
    const scoreArr = ["🔑", " 💩", " 😐", " 😊", "💪"];

    return score > scoreArr ? scoreArr[scoreArr.length - 1] : scoreArr[score];
  };

  return (
    <form onSubmit={handleFormSubmit} className="signup-form">
      <h1>Sign Up</h1>

      <InputText
        name="name"
        label="Name"
        type="text"
        setInputValue={setInputValue}
        minLength="1"
      />
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
        passwordCheck={checkPassStrength(inputValue.password)}
      />

      {signUpFailed && <span className="error-msg">Registration failed</span>}

      <button>Create account</button>
    </form>
  );
};
