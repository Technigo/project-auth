import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { NewUser } from './components/Form1'
import { LoginUser } from './components/Login'
import { LogoutUser } from './components/Logout'
import { Secret } from './components/Secret'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <section>
            <h1>Tell us who you are!</h1>
            <div>
              <NewUser />

              <LoginUser />

            </div>
          </section>
        </Route>
        <Route path="/secrets" exact>
          <section>
            <Secret />
            <LogoutUser />
          </section>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

