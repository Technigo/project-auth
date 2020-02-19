import React from "react";
import styled from "styled-components/macro";
import { Register } from "components /Register";
export const Summary = props => {
  return (
    <section>
      <div>
        <h1>hello world</h1>
        <h2>{props.name}</h2>
      </div>
      <Button
        id="logout"
        className="btn"
        onClick={() => (window.location.href = "/Signin")}
        type="button"
      >
        logout
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
