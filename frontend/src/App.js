import React from 'react'
import {Registration} from './components/Registration'
import {Login} from './components/Login'



export const App = () => {
  return (
    <div className = "authContainer">
      <Registration />
      <Login />
    </div>
  )
}
