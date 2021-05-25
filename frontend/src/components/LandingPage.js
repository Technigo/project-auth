import React from 'react'
import { useSelector } from 'react-redux'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import AuthorizedPage from './AuthorizedPage'

const LandingPage = () => {
  const account = useSelector(store => store.account)

  return (
    <>
      {!account.logedIn && account.signup && (< SignupForm /> )}
      {!account.logedIn && !account.signup && (< LoginForm /> )}
      {account.logedIn && <AuthorizedPage />}
    </>
  )
}

export default LandingPage

