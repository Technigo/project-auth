import React from 'react'

import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import LandingPage from './components/LandingPage'
import { thoughts } from './reducers/thoughts'
import { account } from './reducers/account'

const reducer = combineReducers({
  thoughts: thoughts.reducer,
  account: account.reducer
})

const store = configureStore({ reducer: reducer})

export const App = () => {
  return (
    <Provider store={store}>
      <main className="main">
        <LandingPage />
      </main>
    </Provider>
  )
}
