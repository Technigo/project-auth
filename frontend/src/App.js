import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignUp } from './components/SignUp'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact>
          <SignUp />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}


