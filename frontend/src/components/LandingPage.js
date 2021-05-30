import React from 'react'
import { useSelector } from 'react-redux'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const LandingPage = () => {
  const account = useSelector(store => store.account)

  return (
    <>
      {account.signup && (
        <SignupForm /> 
      )}
      {!account.signup && (
        <LoginForm /> 
      )}
    </>
  )
}

export default LandingPage

