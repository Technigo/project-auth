import React from 'react';
import styled from 'styled-components';

import { useNavigate, Link } from 'react-router-dom';

const ThoughtsContainer = styled.div`
  background-color: #2e925b;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  margin: 0;

  cursor: pointer;
  width: 200px;
  border-radius: 4px;
  background-color: #505168;
  border: none;
  padding: 10px 15px;
  transition-duration: 0.4s;
  overflow: hidden;

  &:hover {
    background: #fff;
    box-shadow: 0px 2px 10px 5px #97b1bf;
    color: #000;
  }
`;
const NotFound = () => {
  return (
    <ThoughtsContainer>
      Page not found...
      <StyledLink to="/">Please sign in</StyledLink>
    </ThoughtsContainer>
  );
};

export default NotFound;
