import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Signup } from 'Components/Signup'
import { Login } from './Components/Login'
import { LogOut } from './Components/LogOut'
import { AuthorizedUser } from './Pages/AuthorizedUser'

export const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [authorization, setAuthorization] = useState(false)

  return (

    <Router>

      <Route exact path="/">
        < Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        < Signup />
        < LogOut loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      </Route>
   

      <Route exact path="/authorizeduser">
        < AuthorizedUser authorization={authorization} setAuthorization={setAuthorization}/>
      </Route>
      
    </Router>

  )
}
