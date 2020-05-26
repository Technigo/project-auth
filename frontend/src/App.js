import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { users } from './reducers/user'
import { FirstPage } from './components/FirstPage'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { Narnia } from './components/Narnia'

import { GlobalStyle } from 'lib/Global';

const reducer = combineReducers({
  users: users.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
        <BrowserRouter>
          <Switch>

            <Route path="/" exact>
              <FirstPage />
            </Route>

            <Route path="/signup" exact>
              <SignUp />
            </Route>

            <Route path="/login" exact>
              <Login />
            </Route>

            <Route path="/narnia" exact>
              <Narnia />
            </Route>

          </Switch>
        </BrowserRouter>
    </Provider>

  )
}


