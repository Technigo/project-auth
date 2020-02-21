import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// const url = "http://localhost:5000/SignIn";
const url = "https://anna-sarah-auth-project.herokuapp.com/SignIn";

export const SignIn = () => {
  // hover function turn on and off
  const inputRef = useRef();

  // for validation useForm
  const { errors, register, handleSubmit } = useForm();
  const onSubmit = values => {
    console.log(values);
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handelSignInSubmit = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      // First one runs
      .then(res => {
        if (!res.ok) {
          throw new Error("Your e-mail and/or password was incorrect");
        }
        window.location.href = "/Summary";
        return res.json();
      })

      .then(
        // if 200 message
        ({ accessToken }) => {
          window.localStorage.setItem("accessToken", accessToken);
          console.log({ accessToken });
        },
        [email, password]
      )
      .catch(err => {
        // if 400 message
        alert(err.message);
      });
  };

  return (
    <Section>
      <Title>Sign in:</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <span className="input">
          <Input
            name="email"
            ref={
              (inputRef,
              register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address"
                }
              }))
            }
            placeholder="Email@mail.com"
            onMouseEnter={() => {
              inputRef.current.focus();
            }}
            type="email"
            onChange={event => setEmail(event.target.value)}
          />
          {errors.email && errors.email.message}
        </span>

        {/* password */}
        <span className="input">
          <Input
            ref={inputRef}
            placeholder="Password"
            onMouseEnter={() => {
              inputRef.current.focus();
            }}
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
            required
          />
        </span>
        <ButtonContainer>
          <Button onClick={() => (window.location.href = "/")} type="button">
            Register
          </Button>

          <Button
            id="signIn"
            className="btn"
            onClick={() => handelSignInSubmit()}
            type="submit"
          >
            Sign In
          </Button>
          {/* </Link> */}
        </ButtonContainer>
      </Form>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const Title = styled.h1``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  color: palevioletred;
  font-size: 1.8vw;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 120px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 50vw;
  height: 25px;
  @media (min-width: 768px) {
    width: 50vw;
  }
`;

const ButtonContainer = styled.div`
  width: 70vw;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  @media (min-width: 768px) {
    width: 50vw;
  }
`;
