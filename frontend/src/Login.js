import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "./services/authorization";
import styled from "styled-components";

import van from "./images/van.jpg";

const Container = styled.div`
  background: #eee;
  height: 100vh;
`;

const Header = styled.h2`
  color: white;
  font-family: "Open Sans";
  letter-spacing: 2px;
  grid-column: 2 / span 3;
  grid-row: 2 / span 1;
  z-index: 100;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

const LoginHeader = styled.h2`
  font-family: "Open Sans";
  letter-spacing: 2px;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Left = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  flex-direction: column;
  letter-spacing: 2px;
`;

const Right = styled.div`
  width: 65%;
  height: 100%;
  background: black;
  text-align: center;
  display: grid;
  grid-template-columns: 10% 10% 60% 10% 10%;
  grid-template-rows: 10% 25% 40% 10% 15%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
`;

const Label = styled.label`
  margin: 0 auto;
  margin-top: 0.5rem;
  color: grey;
  @media (min-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  margin: 0 auto;
  width: 70%;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 0.5rem;
  @media (min-width: 600px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  width: 80%;
  height: 70%;
  margin: 0 auto;
  display: flex;
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Open Sans";
  margin: auto;
`;

const Signup = styled.button`
  grid-column: 3 / span 1;
  grid-row: 4 / span 1;
  opacity: 1;
  background: transparent;
  color: white;
  border-radius: 30px;
  z-index: 100;
  boder: 2px white solid;
  text-decoration: none;
  cursor: pointer;
  font-family: "Open Sans";
  letter-spacing: 2px;
  :hover {
    background: white;
    color: black;
  }
`;

const Signin = styled.button`
  margin: 0 auto;
  text-align: center;
  margin-top: 3rem;
  width: 6rem;
  padding: 1rem;
  background: #a46c4d;
  color: white;
  border: none;
  border-radius: 30px;
  font-family: "Open Sans";
  letter-spacing: 1px;
  cursor: pointer;
  :hover {
    background: #cfac99;
  }
  @media (min-width: 600px) {
    width: 12rem;
  }
`;

const Error = styled.div`
  color: red;
  margin: 0 auto;
  margin-top: 1rem;
`;

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState(false);
  const history = useHistory();

  const handleLoginUser = async event => {
    event.preventDefault();
    const response = await loginUser(email, password);
    if (response.success) {
      history.push("/sessions");
      console.log(response.success);

      return;
    }
    setErrorText(true);
  };

  return (
    <Container>
      <Form>
        <Left>
          <p>Welcome back!</p>
          <LoginHeader>Login to your account</LoginHeader>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          ></Input>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          ></Input>
          <Signin onClick={event => handleLoginUser(event)}>Login</Signin>
          {errorText && <Error>User not found, access forbidden</Error>}
        </Left>
        <Right>
          <Image src={van} />
          <Header>Still not a member?</Header>
          <Signup onClick={() => history.push("/register")}>
            Sign up for an account
          </Signup>
        </Right>
      </Form>
    </Container>
  );
};
