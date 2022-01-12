import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import styled from 'styled-components';

import { RegistrationForm } from 'Components/RegistrationForm';
import { Login } from 'Components/Login';
import { Header } from 'Components/Header';
import { Footer } from 'Components/Footer';
import { SecretContent } from 'Components/SecretContent';
import NotFound from 'Components/NotFound';

// added two reducers
import user from './reducers/user';
import thoughts from './reducers/thoughts'; // thoughts is the hidden content

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer,
});

const store = configureStore({ reducer });

// added provider
export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Header />
          <InnerContainer>
            <Routes>
              <Route path='/' element={<RegistrationForm />} />
              <Route path='/login' element={<Login />} />
              <Route path='/secret' element={<SecretContent />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </InnerContainer>
          <Footer />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: #017c80;
  margin: 0;
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
