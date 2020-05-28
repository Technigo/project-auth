import React from 'react'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'
import { Provider } from "react-redux"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { user } from './reducers/user'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const reducer = combineReducers({ user: user.reducer })

const store = configureStore({ reducer, persistedState })

store.subscribe(() => saveToLocalStorage(store.getState()))

export const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact ><LogIn /></Route>
          <Route path='/' exact ><SignUp /></Route>
          <Route path='/secret' exact ><Profile /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}