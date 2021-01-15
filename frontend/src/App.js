import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { Login } from "./components/Login";
import { user } from "./reducers/user";
import { UserProfile } from "./components/UserProfile";

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <main>
        <Login />
        <UserProfile />
      </main>
    </Provider>
  );
};
