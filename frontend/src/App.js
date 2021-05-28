import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Header from './components/Header'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>  
        <Header />
        <main>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/signup'>
              <SignUp />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </Switch>
        </main>
      </Provider>
    </BrowserRouter>
  )
}
