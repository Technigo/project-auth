import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignedOut = () => {
  return (
    <MainWrapper>
      <SignedOutText>You now know a secret.</SignedOutText>
      <SignedOutText>Can you keep it?</SignedOutText>
      <ToStart to="/">Possibly</ToStart>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100vw;
  margin-top: 20vh;
`;

const SignedOutText = styled.h2`
  font-family: "League Spartan", sans-serif;
  margin-top: 5px;
`;

const ToStart = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: gray;
  margin-top: 40vh;

  &:hover {
    color: darkcyan;
  }
`;

export default SignedOut;
