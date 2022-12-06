import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn } from 'components/SignIn';
import { SignUp } from 'components/SignUp';
import { SecretMessage } from 'components/SecretMessage'
import { NotFound } from 'components/NotFound';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>} ></Route>
        <Route path='/signUp' element={<SignUp/>} ></Route>
        <Route path='/secretContent' element={<SecretMessage/>} ></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter> 
 </Provider>
  );
}
