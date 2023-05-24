import React from 'react';
import { NotFound } from 'components/NotFound';
import { Main } from 'components/Main';
import { Login } from 'components/Login';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import user from 'reducers/user';

export const App = () => {

  const reducer = combineReducers({
    user: user.reducer 
  });
  const store = configureStore({reducer})

  return (
<Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  </BrowserRouter>
</Provider>
  );
}
