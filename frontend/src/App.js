import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Signup } from 'Pages/Signup'
import { Login } from './Pages/Login'
import { AuthorizedUser } from './Pages/AuthorizedUser'

export const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [authorization, setAuthorization] = useState(false)

  return (

    <Router>

      <Route exact path="/">
        < Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      </Route>

      <Route exact path="/register">
        < Signup />
      </Route>
   

      <Route exact path="/authorizeduser">
        < AuthorizedUser authorization={authorization} setAuthorization={setAuthorization} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      </Route>
      
    </Router>

  )
}
