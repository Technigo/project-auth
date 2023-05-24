import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Main from 'components/Main';
import { LoginPage } from 'components/LoginPage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { Provider } from 'react-redux';
import { Footer } from 'components/Footer';

export const App = () => {

  const reducer = combineReducers({
    user: user.reducer,
    thoughts: thoughts.reducer
  });
  const store = configureStore({reducer})

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}> </Route>
          <Route path='/' element={<Main/>}> </Route>
          <Route path='*' element={<NotFound/>}> </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
}

/// npm i react-redux
/// npm i @reduxjs/toolkit
/// npm i react-router-dom
