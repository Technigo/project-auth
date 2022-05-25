import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

import { Provider } from 'react-redux'
import { configstore, combineReducers } from '@reduxjs/toolkit'

import user from 'reducers/user'
import thoughts from 'reducers/thoughts'

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer,
})

const store = configstore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}
