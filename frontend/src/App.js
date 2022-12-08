import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from 'assets/GlobalStyles';
import { StartPage } from './pages/StartPage'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound';
import { LogInPage } from 'pages/LogInPage';
import { RegisterPage } from 'pages/RegisterPage';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';

const reducer = combineReducers({
user: user.reducers,
thoughts: thoughts.reducers
})

const store = configureStore({reducer})


export const App = () => {
  return (
    <>
    <Provider store={store} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/404" element={<NotFound />} /> */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
