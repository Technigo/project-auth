import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Welcome } from './pages/Welcome'
import { SignUp } from './pages/SignUp'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'exact>
          <Welcome />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <h1>Login Page</h1>
        </Route>
        <Route path='/secret'>
          <h1>Secrets Page</h1>
        </Route>
      </Switch>

    </BrowserRouter>
    
  )
}
