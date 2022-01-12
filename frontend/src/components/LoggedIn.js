import React from "react";
import styled from "styled-components/macro";

export const LoggedIn = () => {
  return <Container>Welcome, the game is under construction!</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00a48a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
