import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'

import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'


const reducer = combineReducers({
  user: user.reducer
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
          <Route path="/login" component={Signup} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
