import React, { useState } from 'react'

import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { Status } from './components/Status'

export const App = () => {

  return (
    <main>
      <Login />
      <Status />
      <Profile />
    </main>
  )
}
