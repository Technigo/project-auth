import React from 'react';
import styled from 'styled-components';
import { RegistrationForm } from 'Components/RegistrationForm';
import { Header } from 'Components/Header';
import { Footer } from 'Components/Footer';

export const App = () => {
  return (
    <Container>
      <Header />
      <InnerContainer>
        <RegistrationForm />
      </InnerContainer>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: #017c80;
`;
const InnerContainer = styled.div`
  border: 5px dotted black;
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  background-color: #92dea0;
  padding: 30px;

  :hover {
    background-color: #92dea0;
  }

  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;
