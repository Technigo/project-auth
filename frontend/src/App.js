import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'

import user from './reducers/user'
import secrets from './reducers/secrets'

const reducer = combineReducers({
  user: user.reducer,
  secrets: secrets.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
