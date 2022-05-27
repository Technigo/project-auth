import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import LandingPage from './components/LandingPage'
import AuthorizedPage from './components/AuthorizedPage'
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
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route exact path="/authorized" element={<><AuthorizedPage /><Profile /></>}></Route>
            <Route path="/authorized/profile" element={<><AuthorizedPage /><Profile /></>}></Route>
          </Routes>
        </main>
      </Provider>
    </BrowserRouter>
  )
}