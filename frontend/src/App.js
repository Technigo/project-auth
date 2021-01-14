import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import styled from 'styled-components';

import { user } from './reducer/user';
import { LoginForm } from './components/LoginForm';
import CreateUser from './components/CreateUser';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #F9E9FA;
`;

const reducer = combineReducers({ 
  user: user.reducer,
 });

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <LoginForm />
        <CreateUser />
      </Container>
    </Provider>
  )
}
