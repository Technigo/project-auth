import React from 'react'
// Router imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
// Redux imports
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { auth } from 'reducers/auth'

// Pages
import { Home } from 'home/pages/Home'
import { Signup } from 'components/Signup'
import { Login } from 'components/Login'
import { TopSecret } from 'components/TopSecret'
import { Header } from 'components/Header'
import { PrivateRoute } from 'util/PrivateRoute'

// Redux config
const reducer = combineReducers({
  auth: auth.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <PrivateRoute path="/mySite">
              <TopSecret />
            </PrivateRoute>
            <Route path="*">
              <h1>Error</h1>
            </Route>
          </Switch>
        </main>
      </Router>
    </Provider>
  )
}

