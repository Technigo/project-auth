import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { LogInForm } from './components/LogInForm'
import { user } from './reducers/user'


const reducer = combineReducers({ user: user.reducer})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <LogInForm />
      </Provider>
    </div>
  )
}
