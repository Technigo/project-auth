import React from 'react'
import styled from 'styled-components'

import Register from './components/Register.js'
import Login from './components/Login'


export const App = () => {
  return (
    <div className="container">
      <Register />
      <Login />
    </div>
  )
}
