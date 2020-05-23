import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { users } from './reducers/user'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { Narnia } from './components/Narnia'

const reducer = combineReducers({
  users: users.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>

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


