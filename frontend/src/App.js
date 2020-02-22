import React from 'react'
import {SignUp} from './components/SignUp'
import {SignIn} from './components/SignIn'

// TODO: Sign out - remove token
// TODO: Local storage for token
// TODO: Make the profile for signed in users
// TODO: Styling
// TODO: Separete sign in and sign up




export const App = () => {
  
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  )
}
