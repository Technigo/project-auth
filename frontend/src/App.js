import React, { useState, useEffect } from 'react'
import { StartPage } from './components/StartPage'
import { Welcome } from './components/Welcome'

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  
  return (
    <div>
      {loggedIn &&

        <Welcome currentUser={currentUser} setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
      }
      {!loggedIn &&
        <StartPage currentUser={currentUser} setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />
      }
    </div>
  )
}
