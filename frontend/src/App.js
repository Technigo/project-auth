import React from 'react';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { user } from "./reducers/user";
import { SignUp } from './components/SignUp';

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </>
  );
};
