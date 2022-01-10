import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/404" component={NotFound} />
        <Navigate to="/404" /> */}
      </Routes>
    </BrowserRouter>
  )
}
