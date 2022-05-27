import React from 'react'
import Login from 'components/Login'
import NotFound from 'components/NotFound'
import Main from 'components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer
});

const store = configureStore({reducer});

export const App = () => {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  )
}
