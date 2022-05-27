import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";

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
        <div className="container">
          <div className="page-wrapper">
            <main>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
