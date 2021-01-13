import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { user } from "./reducers/user";

import Signup from "./components/SignUp";
import Login from "./components/Login";
import DetailsButton from "./components/DetailsButton"
// import UserDetails from "./components/UserDetails"

const BASE_URL = "http://localhost:8080/";
const SIGNUP_URL = `${BASE_URL}users`;
const LOGIN_URL = `${BASE_URL}sessions`;

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <Login LOGIN_URL={LOGIN_URL} />
            <Signup SIGNUP_URL={SIGNUP_URL} />
          </Route>
          <Route path="/login" exact>
            <Login LOGIN_URL={LOGIN_URL} />
          </Route>
          <Route path="/signup" exact>
            <Signup SIGNUP_URL={SIGNUP_URL} />
          </Route>
        </Switch>
        <DetailsButton SIGNUP_URL={SIGNUP_URL} />
      </Provider>
    </BrowserRouter>
  )
};