import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import LandingPage from './components/LandingPage'
import AuthorizedPage from './components/AuthorizedPage'
import Feed from './components/Feed'
import Profile from './components/Profile'

import { thoughts } from './reducers/thoughts'
import { account } from './reducers/account'

const reducer = combineReducers({
  thoughts: thoughts.reducer,
  account: account.reducer
})

const store = configureStore({ reducer: reducer})

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <main className="main">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/authorized">
              <AuthorizedPage />
            </Route>
            <Route path="/authorized/profile">
              <AuthorizedPage />
              <Profile />
            </Route>
            <Route path="/authorized/feed">
              <AuthorizedPage />
              <Feed />
            </Route>
          </Switch>
        </main>
      </Provider>
    </BrowserRouter>
  )
}
