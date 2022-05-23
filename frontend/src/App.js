import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import user from './reducers/user';
import Start from "/components/Start"
import SignUp from "/components/SignUp"

import { configureStore, combineReducers } from '@reduxjs/toolkit';

const store = configureStore({ reducer });
const reducer = combineReducers({
  user: user.reducer
});


export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
