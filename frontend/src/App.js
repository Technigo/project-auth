import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Secret } from './pages/Secret'

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/signup' exact>
          <Signup />
        </Route>
        <Route path='/secrets' exact>
          <Secret />
        </Route>
      </Switch>
    </Router>
  )
}
