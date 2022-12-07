import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import Register from "Register";
import AuthFeed from "AuthFeed";
import LogIn from "LogIn";

const reducer = combineReducers({
  user: user.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logininfo" element={<AuthFeed />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    <div>
        Find me in src/app.js!
      </div>
      </>
  );
};