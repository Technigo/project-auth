import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducers/user";

// import { Signup } from "./SignUp";
import Signup from "./components/SignUp";
import Login from "./components/Login";

const BASE_URL = "http://localhost:8080/";
const SIGNUP_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Login LOGIN_URL={LOGIN_URL} />
      <Signup SIGNUP_URL={SIGNUP_URL} />
    </Provider>
  )
};