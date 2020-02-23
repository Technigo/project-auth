import React, {useState} from 'react'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'


export const App = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showSignInForm, setShowSignInForm] = useState(false)

  const onSignUp = () => {
    setShowSignInForm(false)
    setShowSignUpForm(true)
  }

  const onSignIn = () => {
    setShowSignUpForm(false)
    setShowSignInForm(true)
  }

  return ( 
    <div className='start-container'>
    {showSignUpForm && !showSignInForm && <SignUp />}
    {showSignInForm && <SignIn />}
    {!showSignUpForm && <button type='button' className='start-button' onClick={onSignUp}>Sign up</button>}
    {!showSignInForm && <button type='button' className='start-button' onClick={onSignIn}>Sign in</button>}
    </div>
  )
}