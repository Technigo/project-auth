//imports
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form } from "../reusables/Form";
import { Header } from "../reusables/Header";

//styling
const RegistrationContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  @media all and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (min-width: 1024px) {
    width: 50%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const StyledTitle = styled.h1`
  color: var(--darkgreen);
  font-family: "Abril Fatface", serif;
  font-weight: 400;
  font-size: 1.75em;
  padding-top: 15px;
`;

//component
export const Registration = () => {
  return (
    <RegistrationContainer>
      <Header />
      <FormWrapper>
        <Form />
        <TextContainer>
          <p>If you already have an account, sign in on the</p>
          <Link to={`/`}>
            <StyledTitle>Startpage</StyledTitle>
          </Link>
        </TextContainer>
      </FormWrapper>
    </RegistrationContainer>
  );
};
