import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './components/Main'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })


export const App = () => {
  
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </Provider>
  )
}
