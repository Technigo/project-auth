import React from "react";

import { Profile } from "./components/Profile";
import { LoginSignup } from "./components/LoginSignup";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "./reducers/user";

const URL = "https://jonnas-auth.herokuapp.com";

const reducer = combineReducers({ user: user.reducer });

// Get localstorage and sets as preloadedState
const persistedStateJSON = localStorage.getItem("userStore");
let preloadedState = {};
if (persistedStateJSON) {
  preloadedState = JSON.parse(persistedStateJSON);
}

// Configure store with preloadedState
export const store = configureStore({ reducer, preloadedState });

// Store the state in localstorage on Redux state change
store.subscribe(() => {
  localStorage.setItem("userStore", JSON.stringify(store.getState()));
});

export const App = () => {
  return (
    <Provider store={store}>
      <LoginSignup URL={URL} />
      <Profile URL={URL} />
    </Provider>
  );
};
