import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "components/Login";
import Main from "components/Main";
import Notfound from "components/Notfound";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import user from "reducers/user";
import thoughtsPage from "reducers/thoughtsPage";

const reducer = combineReducers({
  user: user.reducer,
  thoughtsPage: thoughtsPage.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
