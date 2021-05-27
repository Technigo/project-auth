import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './components/Main'
import Register from './components/Register'

import user from './reducers/user'

const reducer = combineReducers ({
  user: user.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/mainpage" component={Main} />
          <Route path="/register" component={Register} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
