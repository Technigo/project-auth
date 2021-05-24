import React from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { InputForm } from 'components/InputForm'

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
`;

export const SignIn = () => {
  return (
    <MainContainer>
      <Form>
          <InputForm  id="name" placeholder="Name"></InputForm>
          <InputForm  id="username" placeholder="Username"></InputForm>
          <InputForm  id="email" placeholder="Email"></InputForm>
          <InputForm  id="password" placeholder="Password"></InputForm>
        <Button />
      </Form>
    </MainContainer>
  );
};