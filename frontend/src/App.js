import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Main from 'components/Main';
import Login from 'components/Login';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import thoughts from 'reducers/thought';
import { Provider } from 'react-redux';



export const App = () => {
  
  const reducer = combineReducers({
    user: user.reducer,
    thoughts: thoughts.reducer,
   
  })

  let preloadedState = {};
  const preloadedStateJSON = localStorage.getItem('reduxState')

  if (preloadedStateJSON) {
    preloadedState = JSON.parse(preloadedStateJSON)
    console.log(preloadedState)
  }


  const store = configureStore ({reducer, preloadedState})

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })


  return (
    <Provider store= {store} >

    <BrowserRouter>
     <Routes>
        <Route path ='/login' element={<Login/>}> </Route>
        <Route path ='/' element={<Main/>}></Route>
        <Route path ='/*' element={<NotFound/>}> </Route>
     </Routes>
    </BrowserRouter>
    </Provider>
  );
}
