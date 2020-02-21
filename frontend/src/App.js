import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from 'components/Signup'
import { Login } from 'components/Login'
import { TopSecret } from 'components/TopSecret'
import { Header } from 'components/Header'

export const App = () => {
  return (
    <BrowserRouter>
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
        <Route path="/mySite">
          <TopSecret />
        </Route>
        <Route path="*">
          <h1>Error</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
