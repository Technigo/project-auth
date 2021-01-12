import React from 'react';
import styled from 'styled-components';

import LoginForm from './components/LoginForm';
import CreateUser from './components/CreateUser';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #F9E9FA;
`;

export const App = () => {
  return (
    <Container>
      <CreateUser />
      <LoginForm />
    </Container>
  )
}
