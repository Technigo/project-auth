import React from "react";
import { Link } from "react-router-dom";
import { StyledDiv, StyledButtonGroup, StyledButton } from "GlobalStyles";

export const Start = () => {
  return (
    <StyledDiv>
      <h1>Hi there!</h1>
      <StyledButtonGroup>
        <Link to="/register">
          <StyledButton>Register</StyledButton>
        </Link>
        <Link to="/login">
          <StyledButton>Sign in</StyledButton>
        </Link>
      </StyledButtonGroup>
    </StyledDiv>
  )
}

