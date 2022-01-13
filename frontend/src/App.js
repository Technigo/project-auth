import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./components/login.js";
import { Main } from "./components/main.js";
import { SignUp } from "./components/signup.js";
import { NotFound } from "./components/notFound.js";
import user from "./reducers/user.js";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
