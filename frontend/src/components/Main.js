import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './GlobalStyles';
import styled from 'styled-components';

const Main = () => {
  return (
    <MainWrapper>
      <h1>Welcome!</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register new account</Link>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled(Wrapper)`
  a {
    font-size: 30px;
    padding: 10px;
  }
`;
