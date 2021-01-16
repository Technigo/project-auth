import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers} from '@reduxjs/toolkit'

import { user } from './reducers/user'
import { Form } from './components/Form'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <Form/>
    </Provider>
  )
}