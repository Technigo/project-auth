import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/secret" element={<SecretContent />} />
      </Routes>
    </BrowserRouter>
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

  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;
