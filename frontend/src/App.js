import React from 'react';
import { Provider } from "react-redux";

import { user } from "./reducers/user";
import { Container } from './styling/styling';

import { SignUpForm } from './components/SignUpForm.js'; 
import { LoginForm } from './components/LoginForm.js'; 

import { Status } from './components/Status.js';

import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
       <Container>
        <SignUpForm />
        <LoginForm />
        <Status />
      </Container>
    </Provider>
  )
}
