import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from 'components/Login'
import { Signup } from 'components/Signup'
import { MemberPage } from 'components/MemberPage'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>

        <Route path='/' exact>
          <Login />
        </Route>

        <Route path='/signup'>
          <Signup />
        </Route>

        <Route path='/memberpage'>
          <MemberPage />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}
