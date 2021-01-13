import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LoginForm } from './components/LoginForm'
import { SignUp } from './components/SignUp'
import { Secret } from './components/Secrets'
import { user } from './reducers/user'


const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {

  return (
  <Provider store={store}>
    <BrowserRouter>
      <div className ='auth-container'>
        <Switch>
          <Route path='/' exact>
            <SignUp />
            <LoginForm />
          </Route>
          <Route path='/secrets' exact>
            <Secret />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  )
}
