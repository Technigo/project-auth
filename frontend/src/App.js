import React from 'react';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { user } from './reducers/user';
import { Form } from './components/Form';
import { Status } from './components/Status';

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Status />
        <Form />
      </Provider>
    </>
  );
};
