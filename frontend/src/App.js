import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import drink from './reducers/drink'

import HomePage from './components/HomePage'
import Login from './components/Login'
import Secret from 'components/Secret'
import Register from './components/Register'

const reducer = combineReducers({
  user: user.reducer,
  drink: drink.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/secret" component={Secret}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
