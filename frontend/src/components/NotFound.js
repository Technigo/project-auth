import React from "react";
import styled from "styled-components";

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

export const NotFound = () => {
  return (
    <Container>
      <Title>Page Not Found</Title>
      <Message>The page you are looking for does not exist.</Message>
    </Container>
  );
};
