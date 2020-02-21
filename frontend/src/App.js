import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from 'components/Signup'
import { Login } from 'components/Login'
import { TopSecret } from 'components/TopSecret'

export const App = () => {
  return (
    <BrowserRouter>
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
        <Route path="/mySite/:id">
          <TopSecret />
        </Route>
        <Route path="*">
          <h1>Error</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
