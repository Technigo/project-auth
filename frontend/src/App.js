import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from "@reduxjs/toolkit"

import { user } from './reducers/user'
import { Login } from './components/Login'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
          <Login />
    </Provider>
  )
}

/*______ TO-DO 
- Error Message as variables in backend?
- When I click reveal secret again, the message disapears - WHAT TO DO WITH THIS?
      - keep OR/
      - change button
- error={name === "" ? false : name === 1 ? true : false } //does not work (login, 79)
- clean code
- PR
- Send in
*/