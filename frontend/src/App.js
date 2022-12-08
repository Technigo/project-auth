import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, combineStore } from '@reduxjs/toolkit';

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Main/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}




// npm i
// npm install react-router-dom
// npm install react-redux
// npm install @reduxjs/toolkit