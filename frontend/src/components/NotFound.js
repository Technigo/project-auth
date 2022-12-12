import { StyledButton, StyledDiv } from 'GlobalStyles';
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
  <StyledDiv>
    <h1>Page not Found...</h1>
    <Link to="/">
      <StyledButton>Go to start page</StyledButton>
    </Link>
  </StyledDiv>
  )
}