import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import user from "./reducers/user";
import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

const reducer = combineReducers({
  user: user.reducer,
});

//creating local storage
const persistedStateJSON = localStorage.getItem("userReduxState");
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  localStorage.setItem("userReduxState", JSON.stringify(store.getState()));
});

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
