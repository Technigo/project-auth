import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomeScreen from './pages/HomeScreen' 
import credentials from './reducers/credentials'
import Form from './components/Form'

const reducer = combineReducers({
  credentials: credentials.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={Form} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
