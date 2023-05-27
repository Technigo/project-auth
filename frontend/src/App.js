import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from 'components/Login';
import Register from 'components/Register';
import { Startpage } from 'components/Startpage';
import { Secrets } from 'components/Secrets';
import { NotFound } from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import secrets from 'reducers/secrets';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    secrets: secrets.reducer
  });

  const store = configureStore({reducer});

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Startpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/secrets" element={<Secrets />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}