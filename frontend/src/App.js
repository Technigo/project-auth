import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import { Welcome } from './components/Welcome'
import { NotFound } from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<Main />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
