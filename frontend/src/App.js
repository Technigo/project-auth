// Imports
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Main from './components/Main';
import Login from './components/Login';
import NotFound from './components/NotFound';

import thoughts from 'reducers/thoughts';
import user from 'reducers/user';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    thoughts: thoughts.reducer
  });

  const store = configureStore({ reducer });

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
