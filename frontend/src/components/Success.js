import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
`;

export const Success = () => {
  return (
    <Container>
      <Heading>Your registration was a success!</Heading>
      <Message>Please log in to continue.</Message>
      <StyledLink to="/login">Go to Login</StyledLink>
    </Container>
  );
};
