import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import user from "reducers/user";
// import thoughts from "reducers/thoughts";

const reducer = combineReducers({
  user: user.reducer,
  // thoughts: thoughts.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <div className="page-wrapper">
      <Provider store={store}>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </div>
  );
};
