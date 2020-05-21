import React from 'react'
import { LogIn } from './LogIn'
import { Register } from './Register'

export const StartPage = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      <LogIn />
      <Register />
    </div>
  )
} 