import React, { useState } from 'react'
import { RegistrationForm } from './components/RegistrationForm.js'
import { SigninForm } from './components/SigninForm.js'
import { LoggedInArea } from './components/LoggedInArea.js'


export const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(true)

  return (
    <div>
      {(!isLoggedIn && showRegistrationForm) && <RegistrationForm />}
      {(!isLoggedIn && !showRegistrationForm) && <SigninForm />}
      {isLoggedIn && <LoggedInArea />}

    </div>
  )
}
