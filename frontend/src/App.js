import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Pages/Home'
import SignUp from './Pages/SignUp'

export const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/sign-up'>
            <SignUp />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}
