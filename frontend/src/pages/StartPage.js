import React from 'react'
import { SignUp } from '../components/SignUp'
import { LoginForm } from '../components/LoginForm'

export const StartPage = () => {
  return (
    <section className="forms-container"> 
      <div>
        <SignUp />
      </div>
      <div>
        <LoginForm />
      </div>
    </section> 
  )
}
