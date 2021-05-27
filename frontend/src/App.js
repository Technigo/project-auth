import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import thoughts from './reducers/thoughts'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'


const reducer = combineReducers({
  user: user.reducer,
  thougths: thoughts.reducer
})

const store = configureStore({ reducer })

//           <Signup /> 
//  If you want to pass a prop use render: ---> render={() =>  }
export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
        <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
