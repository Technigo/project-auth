import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from './reducers/user';
import cats from './reducers/cats';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Main from './components/Main';

const reducer = combineReducers({
  user: user.reducer,
  cats: cats.reducer,
});
const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/main' element={<Main />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};
