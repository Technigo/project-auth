import React from 'react';
import styled from 'styled-components';

import { useNavigate, Link } from 'react-router-dom';

const ThoughtsContainer = styled.div`
  background-color: green;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: #fff;
`;
const NotFound = () => {
  return (
    <ThoughtsContainer>
      Page not found...
      <StyledLink to="/signin">Please sign in</StyledLink>
    </ThoughtsContainer>
  );
};

export default NotFound;
