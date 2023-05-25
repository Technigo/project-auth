import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "components/Main";
import { Login } from "components/Login";
import { NotFound } from "components/NotFound";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { user } from "./reducers/user";
import { Provider } from "react-redux";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
