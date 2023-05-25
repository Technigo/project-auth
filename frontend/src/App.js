import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import user from 'reducers/user'
import Login from 'components/Login';
import Main from 'components/Main';
import NotFound from 'components/NotFound';

export const App = () => {

  const reducer = combineReducers({
    user: user.reducer
  });
  const store = configureStore({ reducer })
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}> </Route>
          <Route path='/' element={<Main />}> </Route>
          <Route path='*' element={<NotFound />}> </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
