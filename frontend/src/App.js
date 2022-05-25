import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
`

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/signup" element={<SignupForm />}/>
        {/* <Route path="/404" element={<NotFound />}/> */}
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
