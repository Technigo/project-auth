import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Login from './components/Login'
import userSlice from 'reducers/userSlice';

const reducer = combineReducers({
  user: userSlice.reducer, 
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store={store}>
    <div>
      Find me in src/app.js!
      <Login />
    </div>
    </Provider>
  );
}
