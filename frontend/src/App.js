import React from 'react';
import { BrowserRouter, Routes, Rout } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Main from './components/Main.js';
import Login from './components/Main.js';
import NotFound from './components/Main.js';

import user from './reducers/user';
import thought from './reducers/thought';

const reducer = combineReducers({
  user: user.reducer,
  thought: thought.reducer,
});

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
