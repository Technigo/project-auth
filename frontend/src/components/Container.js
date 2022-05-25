import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import SignIn from './SignIn';
import Main from './Main';
import NotFound from './NotFound';

import user from 'reducers/user';
import thoughts from 'reducers/thoughts'


const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
});

const store = configureStore({reducer})

const Container = () => {
  return (
    <Provider store={store}>
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
