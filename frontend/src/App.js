import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

import user from "./reducers/user";
import secrets from "./reducers/secrets";

const reducer = combineReducers({
  user: user.reducer,
  secrets: secrets.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
