import React from 'react'
import { Session } from './components/Session'
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { auth } from "./reducers/auth";

const reducer = combineReducers({
  auth: auth.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Session />
    </Provider>
  )
}
