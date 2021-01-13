import React from 'react'
import {Provider} from 'react-redux'
import {configureStore, combineReducers} from '@reduxjs/toolkit'

import { Register } from './Register'
import { SignIn } from './SignIn'
import {user} from './reducers/user'

const reducer = combineReducers({user: user.reducer})
const store = configureStore({reducer})

export const App = () => {
  return (
      <Provider store={store}>
        <Register />
        <SignIn />
      </Provider>
  )
}
