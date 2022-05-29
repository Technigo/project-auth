import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { SignUpForm } from 'SignUpForm'
import { SignInForm } from 'SignInForm'
import { LoggedInPage } from 'LoggedInPage'
import { Home } from 'Home'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signin"
          element={<SignInForm />}
        />
        <Route
          path="/signup"
          element={<SignUpForm />}
        />
        <Route
          path="/secrets"
          element={<LoggedInPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}
