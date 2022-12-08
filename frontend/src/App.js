import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LogIn } from './components/LogIn'
import { SignUp } from './components/SignUp'
import { Main } from 'components/Main';
import { NotFound } from 'components/NotFound';
import { user } from 'reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

{/* 
<Route path="*" element={<Navigate to="/404" />} /> */}