import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  height: 100vh;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Text = styled.h1`

`

export const Main = () => {
  return (
    <Wrapper>
      <Text>Register and log in to see the secret page!</Text>
      <div>
        <Link to="/register">
          <Button type="button">Register</Button>
        </Link>
        <Link to="/login">
          <Button type="button">Log In</Button>
        </Link>
      </div>
    </Wrapper>
  );
};
