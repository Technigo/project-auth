import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import LandingPage from './components/LandingPage'
import AuthorizedPage from 'AuthorizedPage'
import Profile from './components/Profile'

import { account } from './reducers/account'

const reducer = combineReducers({
  account: account.reducer
})

const store = configureStore({ reducer: reducer})

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <main className="main">
          <Routes>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/authorized">
              <AuthorizedPage />
              <Profile />
            </Route>
            <Route path="/authorized/profile">
              <AuthorizedPage />
              <Profile />
            </Route>
          </Routes>
        </main>
      </Provider>
    </BrowserRouter>
  )
}
