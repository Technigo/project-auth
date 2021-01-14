import React from 'react';
import styled from 'styled-components';

import { LogOut } from './LogOut';

export const Content = ({ name }) => {
  return (
    <Wrapper>
      <p>Hello! Welcome {name}!</p>
      <LogOut />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 2;
`;
