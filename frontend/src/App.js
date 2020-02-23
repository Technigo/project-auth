import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Secret } from './pages/Secret'
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { auth } from "./reducers/auth";

const reducer = combineReducers({
  auth: auth.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Signup />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/secrets' exact>
            <Secret />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}
