import React, { useState } from "react";
import { InputField } from "./InputField.js";
import { SubmitButton } from "./SubmitButton.js";

import styled from 'styled-components'

const LOGIN = "https://project-auth-liza-kat.herokuapp.com/sessions"

export const Login = ({ setSignedIn }) => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(LOGIN, {
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

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (

	<Image>
    <Form onSubmit={handleFormSubmit}>
      <Text>Login</Text>

      <InputField
        name="email"
        label="Email"
		type="email"
		placeholder="email"
        setInputValue={setInputValue}
        minLength="3"
      />
      <InputField
        name="password"
        label="Password"
		type="password"
		placeholder="password"
        setInputValue={setInputValue}
        minLength="6"
      />

      {loginFailed && <span><Text>Login failed. Email and/or password incorrect. Don't have an account? Sign-up instead!</Text></span>}
<SubmitButton>
	<Button>Sign in</Button>
</SubmitButton>
    </Form>
	</Image>
  );
};
const Image = styled.main`
  background-image: url("${process.env.PUBLIC_URL + "/flower.jpg"}");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
`;
const Button = styled.button`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 20%;
background-color: #8a383e;
border: none;
margin: 8px auto;

&:hover {
	background: #ac8b96;
	cursor: pointer;
	transition: ease-in-out .3s;
  }
`
const Form = styled.form`
display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 30px;
  margin: 400px auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
	background-color: #a9c6ce;
`
const Text = styled.text`
display: flex;
padding: 3px;
flex-direction: column;
color: #44333a;
font-weight: bold;
font-size: 30px;
font-family: "Xanh Mono", monospace;
align-items: center;
justify-content: center;
text-align: center;
text-transform: uppercase;
margin-top: 100px;
`
