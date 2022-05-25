import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
