import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import LogIn from "components/LogIn";
import Main from 'components/Main';
import NotFound from 'components/NotFound';

import thoughts from 'reducers/thoughts';
import user from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};