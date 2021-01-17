import React from "react";
import styled from "styled-components/macro";

const StyledButton = styled.button`
  background: #fff;
  padding: 10px 20px;
  margin: 20px;
  width: ${(props) => (props.small ? "100px" : "220px")};
  font-size: ${(props) => (props.small ? "14px" : "20px")};
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  &:hover {
    background: #404040;
    color: #f1f1f1;
    transition: 0.1s;
  }
`;

export const PrimaryButton = ({ title, onClick, small }) => {
  return (
    <StyledButton small={small} onClick={onClick}>
      {title}
    </StyledButton>
  );
};
