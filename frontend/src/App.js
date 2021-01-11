import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { user } from './reducers/user'
import { Login } from './components/Login'
import { Profile } from './components/Profile'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Provider>
  </BrowserRouter>
  )
}
