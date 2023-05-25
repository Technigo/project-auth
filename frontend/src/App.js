import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Main from 'components/Main';
import Login from 'components/Login';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {user} from 'components/reducers/user';
import score from 'components/reducers/leaderboard';
import { Provider } from 'react-redux';
import { loading } from 'components/reducers/loading';
import leaderboard from 'components/reducers/leaderboard';


export const App = () => {

  const reducer = combineReducers({
    user: user.reducer,
    leaderboard: leaderboard.reducer,
    loading: loading.reducer,

  });
  const store = configureStore({reducer})

  return (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Main />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
 </Provider>
  );
}
