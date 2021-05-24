import React from "react";
import styled from "styled-components";

import { Button } from "components/Button";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
`;

export const SignIn = () => {
  return (
    <MainContainer>
      <div>SIGN IN</div>
      <Button />
    </MainContainer>
  );
};
