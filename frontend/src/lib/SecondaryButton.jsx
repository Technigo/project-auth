import React from "react";
import styled from "styled-components/macro";

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  font-size: 16px;
  border: none;
  background: none;

  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  border-bottom: 1px solid #000;

  &:hover {
    color: #808080;
    transition: 0.1s;
  }
`;

export const SecondaryButton = ({ onClick, small, text }) => {
  return (
    <StyledButton small={small} onClick={onClick}>
      {text}
    </StyledButton>
  );
};
