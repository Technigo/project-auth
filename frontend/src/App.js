import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import drink from './reducers/drink'

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
          <Route exact path="/" />
          <Route path="/signup" />
          <Route path="/login" />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
