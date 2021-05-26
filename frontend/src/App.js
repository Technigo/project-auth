import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import user from './reducers/user'
import secret from './reducers/secret'

const reducer = combineReducers({
  user: user.reducer,
  secret: secret.reducer
});

const store = configureStore({ reducer })

export const App = () => {

  return (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/Signup" exact component={Signup} />
        <Route path="/Login" exact component={Login} />
      </Switch>
    </Router>
  </Provider>
  )
}
