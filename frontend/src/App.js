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
- Folder for Paths? 
- Error Message as variables in backend?
- When I click reveal secret again, the message disapears
- Different error messages depending on whats wrong when signing up 
    - Name already exist
    - Email does not match requirements
    - Password does not match requirements
- Deploy to Heruko and Netlify 
- Write ReadMe 
*/