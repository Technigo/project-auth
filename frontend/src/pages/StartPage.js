import React from 'react'
import { SignUp } from '../components/SignUp'
import { LogIn } from '../components/LoginForm'


export const StartPage = () => {
  return (
    <section> 
      <div>
        <SignUp />
      </div>
      <div>
        <LoginForm />
      </div>
    </section> 
  )
}
