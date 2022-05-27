import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Start = () => {
  return (
    <Wrapper>
      <Logo>Want to know a secret?</Logo>

      <LinkWrapper>
        <LoginLink to="/login">YES!</LoginLink>
      </LinkWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: "Shrikhand", cursive;
  text-shadow: 5px 5px yellow;
  font-size: 70px;
  color: darkcyan;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 110px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginLink = styled(Link)`
  font-family: "League Spartan", sans-serif;
  /* margin-right: 50px; */
  color: black;
  text-decoration: none;
  margin-top: 20px;
  font-size: 80px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.95);
    }

    70% {
      transform: scale(1.4);
      color: #e204ab;
    }

    100% {
      transform: scale(0.95);
    }
  }

  @media (min-width: 768px) {
    font-size: 100px;
  }

  &:hover {
    color: yellow;

    &:active {
      color: pink;
    }
  }

  @media (min-width: 768px) {
    font-size: 180px;
    margin-top: 40px;
  }
`;

const MainLink = styled(LoginLink)`
  margin-right: 0;
`;

export default Start;
