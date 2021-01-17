import React from "react";

import { Profile } from "./components/Profile";
import { LoginSignup } from "./components/LoginSignup";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "./reducers/user";

const URL = "http://localhost:8080";

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <LoginSignup />

      <Profile URL={URL} />
    </Provider>
  );
};
