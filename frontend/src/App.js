import React from 'react';
import { SignUp } from 'SignUp.js';
import { LogIn } from 'LogIn.js';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { user } from './reducers/user';

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <SignUp />
      <LogIn />
    </Provider>
  );
};
