import React from 'react'
import {Registration} from './components/Registration'
import {Login} from './components/Login'
import {MemberPage} from './components/MemberPage'
import {BrowserRouter, Switch, Route} from 'react-router-dom'


export const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/">
      <div className="authContainer">
        <Registration />
        <Login />
      </div>
      </Route>
      <Route path="/Memberpage">
        <MemberPage />
      </Route>
    </Switch>
    </BrowserRouter>
  )
}
