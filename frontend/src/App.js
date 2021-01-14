import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "./reducers/user";

import { Home } from "./components/Home"
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";


//const URL = "https://project-auth-liza-kat.herokuapp.com/users"

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users" exact>
            <SignUp />
          </Route>
          <Route path="/sessions" exact>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
