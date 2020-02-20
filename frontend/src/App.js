import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Secret } from './components/Secret'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <SignUp />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/secret'>
          <Secret />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
