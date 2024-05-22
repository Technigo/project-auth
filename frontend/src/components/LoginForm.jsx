//POST request to sessions with email and password

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch(`http://localhost:8080/sessions`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.accessToken == undefined) {
          alert("Incorrect password, try again");
        } else {
          navigate("/user-page");

          console.log(response);
        }
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <label htmlFor="user-email">Fill in your mail: </label>
      <input onChange={handleEmailChange} type="text" id="user-email"></input>
      <label htmlFor="user-password">Fill in your password: </label>
      <input
        onChange={handlePasswordChange}
        type="password"
        id="user-password"
      ></input>
      <button onClick={login}> Login </button>
    </>
  );
};
