import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "./services/authorization";
import styled from "styled-components";

import woman from "./images/woman.jpg";

const Container = styled.div`
  background: #eee;
  height: 100vh;
`;

const Left = styled.div`
  width: 35%;
  height: 100%;
  background: black;
  text-align: center;
  display: grid;
  grid-template-columns: 10% 10% 60% 10% 10%;
  grid-template-rows: 10% 25% 40% 10% 15%;
`;

const Right = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  letter-spacing: 2px;
`;

const Top = styled.div`
  color: white;
  font-family: "Open Sans";
  letter-spacing: 2px;
  grid-column: 2 / span 3;
  grid-row: 2 / span 1;
  z-index: 100;
  font-size: 0.5rem;
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
`;

const Signin = styled.button`
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
  :hover {
    background: white;
    color: black;
  }
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

const HeaderRight = styled.h2`
  text-align: center;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

const Signup = styled.button`
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
  :hover {
    background: #cfac99;
  }
  @media (min-width: 600px) {
    width: 12rem;
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

const Error = styled.div`
  color: red;
  margin: 0 auto;
  margin-top: 1rem;
`;

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState(false);
  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();
    const response = await registerUser(name, email, password);
    if (response.success) {
      history.push("/login");
      console.log("success");
      return;
    }
    setErrorText(true);
    console.log("error");
  };

  return (
    <Container>
      <Form>
        <Left>
          <Image src={woman} />
          <Top>
            <h2>One of us?</h2>
            <p>
              If you already have an account, just sign in. We have missed you!
            </p>
          </Top>
          <Signin onClick={() => history.push("/login")}>SIGN IN</Signin>
        </Left>
        <Right>
          <HeaderRight>Register with us, let´s travel together:</HeaderRight>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          ></Input>

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

          <Signup onClick={event => handleRegister(event)}>REGISTER</Signup>
          {errorText && <Error>Could not add user. Please try again!</Error>}
        </Right>
      </Form>
    </Container>
  );
};
