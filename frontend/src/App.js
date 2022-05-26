import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "components/Login";
import Main from "components/Main";
import Notfound from "components/Notfound";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import user from "reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/loggedin" element={<Main />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
