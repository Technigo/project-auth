import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StartPage from './pages/StartPage'
import SignupPage from './pages/SignupPage'
import SecretPage from './pages/SecretPage'


export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <StartPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
        <Route path='/secret'>
          <SecretPage />
        </Route>
      </Switch> 
    </BrowserRouter>
  )
}
