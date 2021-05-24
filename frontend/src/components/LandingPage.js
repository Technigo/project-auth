import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useSelector } from 'react-redux'

const LandingPage = () => {
  const account = useSelector(store => store.account)

  return (
    <>
      {account.signup ? < SignupForm /> : < LoginForm />}
    </>
  )
}

export default LandingPage

