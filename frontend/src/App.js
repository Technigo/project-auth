import React from 'react';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import styled from 'styled-components';

import { user } from './reducers/user';
import { Form } from './components/Form';
import { Status } from './components/Status';

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <MainWrapper>
      <Provider store={store}>
        <Form />
        <Status />
      </Provider>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;