import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationForm } from 'components/RegistrationForm';
import { SecretMessage } from 'components/SecretMessage'

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
        <Route path='/login' element={<RegistrationForm/>} ></Route>
        <Route path='/secretmessage' element={<SecretMessage/>} ></Route>
        {/*<Route path='*' element={<NotFound/>}></Route>*/}
      </Routes>
    </BrowserRouter> 
 </Provider>
  );
}
