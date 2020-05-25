import React from 'react'
import { LogIn } from './LogIn'
import { Register } from './Register'

export const StartPage = ({ loggedIn, setLoggedIn, currentUser, setCurrentUser }) => {
  return (
    <div>
      <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Register />
    </div>
  )
} 