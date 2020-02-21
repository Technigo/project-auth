import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Signup } from 'components/Signup'
import { Login } from 'components/Login'
import { TopSecret } from 'components/TopSecret'
import { Header } from 'components/Header'
import { PrivateRoute } from 'util/PrivateRoute'

export const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <h1>Welcome!</h1>
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
    </Router>
  )
}

