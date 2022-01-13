import React from 'react'
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { Login } from 'components/Login';
import { Main } from 'components/Main';
import { NotFound } from 'components/NotFound';

import user from "./reducer/user"
import secrets from 'reducer/secrets';


const reducer = combineReducers({
 user: user.reducer,
 secrets: secrets.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <article className="appContainer">
          <Routes>
          <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </article>
      </Router>
    </Provider>
  );
};
