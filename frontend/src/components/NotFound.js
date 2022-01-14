import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { useNavigate, Link } from 'react-router-dom';

/////-------------------styling---------------------------------///
const GlobalStyle = createGlobalStyle`
  body {
    background-color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding-top:20px;
    overflow: scroll;
  }`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
  align-content: center;
`;
const Message = styled.h1`
  line-height: 4rem;
  font-family: 'Rosarivo', serif;
  font-size: 1.5rem;
  margin: 2rem 0;
  padding: 0 24px;
  color: white;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  margin: 0;

  cursor: pointer;

  border-radius: 4px;
  background-color: #505168;
  border: none;
  padding: 10px 25px;
  transition-duration: 0.4s;
  overflow: hidden;

  &:hover {
    background: #fff;
    box-shadow: 0px 2px 10px 5px #97b1bf;
    color: #000;
  }
`;

/////-------------------styling---------------------------------///
const NotFound = () => {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate('/login');
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Message>Page not found...</Message>
        <StyledLink to="/" onClick={onGoBack}>
          Go Back
        </StyledLink>
      </Container>
    </>
  );
};

export default NotFound;
