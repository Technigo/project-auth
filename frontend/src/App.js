import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'components/Home';
import Login from 'components/Login';
import Registration from 'components/Registration';
import Profile from 'components/Profile';
import NotFound from 'components/NotFound';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from 'reducers/user';
import thoughts from 'reducers/thoughts';

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
