import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { Content } from './components/Content'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div>
            <Link to="/login">
              <button>Log in</button>
            </Link>
            <Link to="/signup">
            <button>Sign up</button>
            </Link>
          </div>
        </Route>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/content">
          <Content />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
