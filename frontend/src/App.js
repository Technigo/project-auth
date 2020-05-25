import React, { useState } from 'react'
import { StartPage } from './components/StartPage'
import { Welcome } from './components/Welcome'

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  return (
    <div>
      {loggedIn &&

        <Welcome loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      }
      {!loggedIn &&
        <StartPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      }
    </div>
  )
}
