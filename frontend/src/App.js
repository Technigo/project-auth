import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer
});
const store = configureStore({reducer});

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" elements={<Login/>}></Route>
          <Route path="/" elements={<Main/>}></Route>
          <Route path="*" elements={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
