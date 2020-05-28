import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import { SignUpform } from './components/SignUpform'
import { SignInform } from './components/SignInform'
import {  SecretMessage } from './components/SecretMessage'

// lib
import { Card } from './lib/Card'



export const App = () => {
  return (
    
    <BrowserRouter>
    <Switch>
    <Card>

    <Route path="/" exact>
           <SignUpform />
           <SignInform  /> 
    </Route>

    <Route path='/secretmessage'>
          <SecretMessage />
    </Route>

    </Card>
    </Switch>
    </BrowserRouter>
  )
}


