import NotFound from 'component/NotFound';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from 'component/NotFound';
import Main from 'component/Main';
import Login from 'component/Login';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { Provider } from 'react-redux';

export const App = () => {

  const reducer = combineReducers({
    user: user.reducer,
    thoughts: thoughts.reducer
  })
  const store = configureStore({reducer})

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path ='/login' element={<Login/>}></Route>
          <Route path ='' element={<Main/>}></Route>
          <Route path ='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
