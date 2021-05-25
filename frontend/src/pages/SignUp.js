import React from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { InputForm } from "components/InputForm";
import { Footer } from "components/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100%;
  margin-bottom: 100px;
  border: 1px solid black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
`;

const CreateAccount = styled.h1`
  font-weight: 500;
  font-size: 23px;
  color: #83868e;
  font-family: "Roboto";
  margin-bottom: 40px;
`;

export const SignUp = () => {
  return (
    <>
      <Container>
        <CreateAccount>Create New Account</CreateAccount>
        <Form>
          <InputForm id="name" placeholder="Name"></InputForm>
          <InputForm id="username" placeholder="Username"></InputForm>
          <InputForm id="email" placeholder="Email"></InputForm>
          <InputForm id="password" placeholder="Password"></InputForm>
          <Button buttonText="register" />
        </Form>
      </Container>
      <Footer
        footerText="Already have an account?"
        linkText="Sign In"
        linkTo="/"
      />
    </>
  );
};
