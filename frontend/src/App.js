import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import MainPage from './pages/MainPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import user from './reducers/user'
import travelInspo from './reducers/travelInspo'

const reducer = combineReducers({
  user: user.reducer,
  travelInspo: travelInspo.reducer
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/travelinspo" component={MainPage} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default App