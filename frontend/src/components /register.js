import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const url = "http://localhost:5000/";

export const Register = () => {
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
        <span className="input">
          <input
            className="name"
            type="text"
            onChange={event => setName(event.target.value)}
            value={name}
            required
          />
        </span>

        {/* email */}
        <span className="input">
          <input
            className="email"
            type="text"
            onChange={event => setEmail(event.target.value)}
            value={email}
            required
          />
        </span>

        {/* password */}
        <span className="input">
          <input
            className="password"
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
`;
