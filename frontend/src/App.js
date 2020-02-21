import React, { useState } from 'react'
import { Link, useHistory, BrowserRouter, Switch, Route } from "react-router-dom"
import { MemberPage } from './components/MemberPage'

import { Login } from './components/Login'
import { Registration } from './components/Registration'

export const App = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      < Login />
      < Registration />
      Find me in src/app.js!
      </div>
  )}