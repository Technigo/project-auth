import React from 'react';
import { SignUp } from '../components/SignUp';
import { LogIn } from '../components/LogIn';
import styled from 'styled-components/macro';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #355C7D;
  height: 500px;
  color:  white;
`;

export const StartPage = () => {
  return (
    <Container> 
      
      <div>
        <SignUp />
      </div>

      <div>
        <LogIn />
      </div>

    </Container> 
  );
};
