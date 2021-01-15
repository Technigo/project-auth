import React, { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { InputField } from "./InputField";
//import {UserProfile} from "./UserProfile"

import styled from "styled-components";
import { rgba } from "polished";

const SIGNUP = "https://project-auth-liza-kat.herokuapp.com/users";

export const SignUp = ({ setSignedUp }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpFailed, setSignUpFailed] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(SIGNUP, {
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
          localStorage.setItem("signedUp", JSON.stringify(true));
          setSignedUp(JSON.parse(localStorage.getItem("signedUp")));
        } else if (!json.signUpSuccessful) {
          setSignUpFailed(true);
        }
      });

    setInputValue({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <Image>
      <Form onSubmit={handleFormSubmit}>
        <Text>Sign up</Text>

        <InputField
          name="name"
          label="Name"
          type="name"
          placeholder="name"
          setInputValue={setInputValue}
          minLength="5"
        />
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

        {signUpFailed && (
          <span>
            <Text>
              Failed to sign up. Please ensure that all fields have been filled
              out and try again.
            </Text>
          </span>
        )}
        <SubmitButton title="Sign up" />
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-bottom: 30px;
  margin: 100px auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  background-color: ${rgba("#a1bdc8", 0.5)};
  @media (max-width: 950px) {
    margin: 30px auto;
    width: 60%;
    margin-bottom: 10px;
  }
  @media (max-width: 660px) {
    margin: 30px auto;
    width: 60%;
    margin-bottom: 10px;
  }
`;
const Text = styled.text`
  display: flex;
  padding: 10px;
  font-size: 20px;
  flex-direction: column;
  color: #a73e42;
  font-weight: bold;
  font-family: "Xanh Mono", monospace;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  margin-top: 30px;
  letter-spacing: 2px;
  @media (max-width: 950px) {
    font-size: 17px;
    margin-top: 10px;
  }
  @media (max-width: 660px) {
    font-size: 17px;
    margin-top: 10px;
  }
`;
