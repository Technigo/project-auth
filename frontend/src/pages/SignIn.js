import React from "react";
import styled from "styled-components";

import { Button } from "components/Button";
import { InputForm } from 'components/InputForm'
import { Footer } from 'components/Footer'


const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
`;

export const SignIn = () => {
  return (
      <Form>
          <InputForm  id="username" placeholder="Username"></InputForm>
          <InputForm  id="password" placeholder="Password"></InputForm>
        <Button 
          buttonText="sign in" />
        <Footer footerText="Don't have an account?" linkText="Sign In" linkTo="/signup"/>
      </Form>
  );
};
