import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { user } from './reducers/user';
import { Home } from './pages/Home';
//import { SignUpForm } from './components/SignUpForm'

//FETCH (THUNK?)
const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  //

  //Sign up

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
