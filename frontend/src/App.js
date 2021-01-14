import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { StartPage } from './pages/StartPage'
import { Secret } from './pages/Secrets'
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
            <StartPage />
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
