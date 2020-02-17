import React from 'react'
import { useSelector } from 'react-redux'

import { RegistrationForm } from './RegistrationForm.js'
import { SigninForm } from './SigninForm.js'
import { LoggedInArea } from './LoggedInArea.js'

export const AuthApp = () => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn)
  const showSigninForm = useSelector(store => store.auth.showSigninForm)

  return (
    <>
      {(!isLoggedIn && !showSigninForm) && <RegistrationForm />}
      {(!isLoggedIn && showSigninForm) && <SigninForm />}
      {isLoggedIn && <LoggedInArea />}
    </>

  )
}
