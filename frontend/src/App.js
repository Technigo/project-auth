import React, { useState } from 'react'
import { StartPage } from './components/StartPage'
import { Welcome } from './components/Welcome'

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div>
      {loggedIn &&

        <Welcome />
      }
      {!loggedIn &&
        <StartPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      }
    </div>
  )
}
