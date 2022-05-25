import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './Main';
import SignIn from './SignIn';
import NotFound from './NotFound';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user from 'reducers/user';
import thoughts from 'reducers/thought'

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
});

const store = configureStore({reducer})

const Container = () => {
  return (
    <Provider store ={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/main' element={<Main />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/notfound' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default Container;
