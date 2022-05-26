import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from 'components/Login';
import Profile from 'components/Profile';
import NotFound from 'components/NotFound';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="appContainer">
          <div className="appInnerContainer">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};
