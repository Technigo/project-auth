import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "@reduxjs/toolkit";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignedIn from "./components/SignedIn";
import StartPage from "./components/StartPage";
import NotFound from "./components/NotFound";

import { user } from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

// Retrieve localstorage as initial state
const persistedStateJSON = localStorage.getItem("userReduxState");
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Store the state in localstorage when Redux state change
store.subscribe(() => {
  localStorage.setItem(
    "userReduxState",
    JSON.stringify(store.getState())
  );
});

export const App = () => {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/signup"
            element={
              <SignUp
                nameInput={nameInput}
                passwordInput={passwordInput}
                setNameInput={setNameInput}
                setPasswordInput={setPasswordInput}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                nameInput={nameInput}
                passwordInput={passwordInput}
                setNameInput={setNameInput}
                setPasswordInput={setPasswordInput}
              />
            }
          />
          <Route path="/signedin" element={<SignedIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
