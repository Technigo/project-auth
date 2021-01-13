import React, { useState } from 'react'

import { Status } from './components/Status'
import { Profile } from './components/Profile'
import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'
import { user } from './reducers/user'

export const App = () => {
  // <Status /> <Profile />
  return (
    <section>
   
      <LoginForm />
      <SignupForm />
    </section>
  )
}
