import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import { Welcome } from './components/Welcome'
import { NotFound } from './components/NotFound'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Main />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="notfound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
