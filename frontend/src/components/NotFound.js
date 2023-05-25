import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const NotFound = () => {
  return (
    <Container>
      <Title>Page Not Found</Title>
      <Message>The page you are looking for does not exist.</Message>
      <LinksContainer>
        <StyledLink to="/login">GO TO LOGIN</StyledLink>
        <StyledLink to="/">GO TO MAIN</StyledLink>
      </LinksContainer>
    </Container>
  );
};
