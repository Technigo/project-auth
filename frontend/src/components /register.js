import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { Summary } from "components /Summary";

const url = "http://localhost:5000/";

export const Register = () => {
  // hover function turn on and off
  const inputRef = useRef();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const handelRegisterSubmit = () => {
    // event.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return (
    <section>
      <form onSubmit={event => event.preventDefault()}>
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
            type="text"
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
            type="text"
            onChange={event => setPassword(event.target.value)}
            value={password}
            required
          />
        </span>
      </form>

      <Link className="link" to={`/Summary`}>
        <Button onClick={handelRegisterSubmit} type="submit">
          Submit
        </Button>
      </Link>

      <Button onClick={() => (window.location.href = "/SignIn")} type="button">
        SignIn
      </Button>
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
  width: 120px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 300px;
  height: 25px;
`;
