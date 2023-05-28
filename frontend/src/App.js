import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import { user } from './reducers/user'
import { thoughts } from './reducers/thoughts'
import NotFound from 'components/NotFound';
import Main from 'components/Main';
import Login from 'components/Login';


export const App = () => {
  const reducer = combineReducers({ 
    user: user.reducer, // Combine the reducer for the 'user' slice of state
    thoughts: thoughts.reducer // Combine the reducer for the 'thoughts' slice of state
  });

  const store = configureStore({ reducer }); // Create a Redux store using the combined reducer
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/login' 
            element={
            <Login/>}> 
          </Route>
          <Route path='/' element={<Main/>}> </Route>
          <Route path='*' element={<NotFound/>}> </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}


/// npm i react-redux
/// npm i @reduxjs/toolkit
/// npm i react-router-dom