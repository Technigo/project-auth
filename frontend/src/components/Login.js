import React, { useState } from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../images/police.jpg";
import { useMediaQuery } from "react-responsive";

export const Login = ({ onSetCurrentScreen }) => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const isMobile = useMediaQuery({ query: "(max-width: 420px)" });
  return (
    <Main>
      {!isMobile && <Image></Image>}
      <RightColumn>
        <Container>
          <LogotypeContainer>
            <Logotype>
              <PrimaryLogo>
                <FontAwesomeIcon icon={faBookDead} />
                Murder
              </PrimaryLogo>
              <SecondaryLogo>Mystery</SecondaryLogo>
            </Logotype>
            <IntroText>
              MurderMystery is an online game where you are put in the shoes of
              a criminal investigator tasked with solving a fictional crime. Log
              in to the police network to start the investigation.
            </IntroText>
          </LogotypeContainer>

          <LoginDetails>
            <EmailInput
              placeholder="Email"
              onChange={(event) =>
                setLoginDetails({ email: event.target.value })
              }
            ></EmailInput>
            <PasswordInput
              placeholder="Password"
              onChange={(event) =>
                setLoginDetails({ password: event.target.value })
              }
            ></PasswordInput>
          </LoginDetails>
          <ButtonContainer>
            <SignUpButton>Sign up</SignUpButton>
            <GuestButton>Guest</GuestButton>
            <LoginButton>Login</LoginButton>
          </ButtonContainer>
        </Container>
      </RightColumn>
    </Main>
  );
};

const Main = styled.main`
  height: 100vh;
  min-height: 667px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: black;
`;

const Image = styled.div`
  height: 100%;
  background-image: url(${backgroundImage});
  opacity: 0.2;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const RightColumn = styled.div`
  height: 100%;
  background-color: #00a48a;
  @media (max-width: 420px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  width: 375px;
  padding: 10px 10px 10px;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

const LogotypeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: #f4f6f8;
  padding: 10px;
`;

const Logotype = styled.h1`
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin: 0;
  font-size: 25px;
`;

const PrimaryLogo = styled.span`
  font-weight: 900;
`;

const SecondaryLogo = styled.span`
  font-weight: 400;
`;

const IntroText = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const LoginDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  margin: 10px 0px;
  padding: 5px;
`;

const PasswordInput = styled.input`
  padding: 5px;
`;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
`;

const SignUpButton = styled.button`
  background-color: #36a9ae;
  background-image: linear-gradient(#37adb2, #329ca0);
  border: 1px solid #2a8387;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 1px;
  color: #ffffff;
  cursor: pointer;
  display: block;
  font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  font-size: 17px;
  line-height: 100%;
  margin: 0;
  outline: 0;
  padding: 11px 15px 12px;
  text-align: center;
  transition: box-shadow 0.05s ease-in-out, opacity 0.05s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;

  &:hover {
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 2px inset,
      rgba(0, 0, 0, 0.4) 0 1px 2px;
    text-decoration: none;
    transition-duration: 0.15s, 0.15s;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 4px inset,
      rgba(0, 0, 0, 0.4) 0 1px 1px;
  }
`;

const GuestButton = styled(SignUpButton)``;
const LoginButton = styled(SignUpButton)``;
