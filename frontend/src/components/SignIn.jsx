//imports
import styled from "styled-components";
import { Form } from "../reusables/Form";
import { Header } from "../reusables/Header";
import { Button } from "../reusables/Button";

//styling
const SignInContainer = styled.section`
  display: flex;
  flex-direction: column;

  @media all and (min-width: 1024px) {
    flex-direction: row;
  }
`;

//component

export const SignIn = () => {
  return (
    <SignInContainer>
      <Header />
      <Form />
      <Button />
    </SignInContainer>
  );
};
