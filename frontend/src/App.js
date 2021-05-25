import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import HomeScreen from './pages/HomeScreen' 
import credentials from './reducers/credentials'

const reducer = combineReducers({
  credentials: credentials.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </div>
  )
}
