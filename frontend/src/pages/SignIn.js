import React from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { InputForm } from "components/InputForm";
import { Footer } from "components/Footer";
import logo from "components/logo.png";
import pic from "components/pic.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100%;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    flex-direction: row;
    height: 60%;
    max-width: 75%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

const FormContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  align-items: center;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.img`
  object-fit: cover;
  background-image: url(./components/pic.jpg);
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  background-image: url(./components/logo.png);
  width: 50%;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
  @media (min-width: 1200px) {
    width: 40%;
  }
`;

export const SignIn = () => {
  return (
    <>
      <Container>
        <FormContainer>
          <Logo src={logo}></Logo>
          <Form>
            <InputForm id="username" placeholder="Username"></InputForm>
            <InputForm id="password" placeholder="Password"></InputForm>
            <Button buttonText="sign in" />
          </Form>
        </FormContainer>
        <ImageContainer>
          <Image src={pic}></Image>
        </ImageContainer>
      </Container>
      <Footer
        footerText="Don't have an account?"
        linkText="Sign In"
        linkTo="/signup"
      />
    </>
  );
};
