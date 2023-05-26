import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/Login'
import Main from 'components/Main'
import Secrets from 'components/Secrets'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { user } from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
 <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/secrets" element={<Secrets />} />
      </Routes>
    </BrowserRouter> 
 </Provider>
  )
}