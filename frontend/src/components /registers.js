import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router";

// const url = "http://localhost:5000/";
const url = "https://anna-sarah-auth-project.herokuapp.com/";

export const Register = () => {
  // hover function turn on and off
  const inputRef = useRef();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const history = useHistory();

  const handelRegisterSubmit = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => {
        setName("");
        setEmail("");
        setPassword("");
        console.log(json);
      });
  };

  return (
    <Section>
      <Title>Register:</Title>
      <Form onSubmit={event => event.preventDefault()}>
        {/* name */}
        <span>
          <Input
            placeholder="Name"
            ref={inputRef}
            onMouseEnter={() => {
              inputRef.current.focus();
            }}
            type="text"
            onChange={event => setName(event.target.value)}
            value={name}
            required
          />
        </span>

        {/* email */}
        <span>
          <Input
            placeholder="Email@mail.com"
            ref={inputRef}
            onMouseEnter={() => {
              inputRef.current.focus();
            }}
            type="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            required
          />
        </span>

        {/* password */}
        <span>
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
      </Form>
      <ButtonContainer>
        <Link className="link" to={`/Summary`}>
          <Button onClick={handelRegisterSubmit} type="submit">
            Register
          </Button>
        </Link>
        <Button onClick={() => history.push("/SignIn")} type="button">
          Sign In
        </Button>
      </ButtonContainer>
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
  width: 20vw;
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
  margin-left: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  @media (min-width: 768px) {
    width: 50vw;
  }
`;
