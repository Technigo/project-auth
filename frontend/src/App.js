import React from 'react'
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configureStore, combineReducers } from "@reduxjs/toolkit";



import { Login } from 'components/Login';
import { Main } from 'components/Main';
import { NotFound } from 'components/NotFound';

import user from "./reducer/user"


const reducer = combineReducers({
 user:user.reducer,
 
});

const store = configureStore({ reducer });


export const App = () => {
  
  return(
  <Provider store={store}>
    <Router>
      <article className="appContainer">
        <Routes>
        <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="*" element={<NotFound />}></Route>
          
        </Routes>
      </article>
    </Router>
  </Provider>)
}
