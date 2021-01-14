import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore} from '@reduxjs/toolkit'


import Login from './components/Login'
import { user } from './reducers/user'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

// use App as our "page"
export const App = () => {


  return (
    <Login />
  )}