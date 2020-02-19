import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const url = "http://localhost:5000/SignIn";

export const SignIn = () => {
  // hover function turn on and off
  const inputRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handelSignInSubmit = () => {
    // event.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return (
    <section>
      <form onSubmit={event => event.preventDefault()}>
        {/* email */}
        <span className="input">
          <Input
            ref={inputRef}
            placeholder="Email@mail.com"
            onMouseEnter={() => {
              inputRef.current.focus();
            }}
            type="text"
            onChange={event => setEmail(event.target.value)}
            value={email}
            required
          />
        </span>

        {/* password */}
        <span className="input">
          <Input
            ref={inputRef}
            placeholder="Password"
            onMouseEnter={() => {
              inputRef.current.focus();
            }}
            type="text"
            onChange={event => setPassword(event.target.value)}
            value={password}
            required
          />
        </span>
        <Link className="link" to={`/Summary`}>
          <Button
            id="signIn"
            className="btn"
            onClick={handelSignInSubmit}
            type="button"
          >
            Submit
          </Button>
        </Link>
      </form>
    </section>
  );
};

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
