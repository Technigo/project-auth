import React from "react";
import styled from "styled-components";

const SecretsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-weight: bold;
`;

export const Secrets = () => {
  return (
    <SecretsContainer>
      <p>This is a very secret message.</p>
      {/* add sign out button */}
    </SecretsContainer>
  );
};
