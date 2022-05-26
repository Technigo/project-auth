import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
// import Header from './components/Header'
// import Footer from './components/Footer'

import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import user from 'reducers/user'
import info from 'reducers/info'

const reducer = combineReducers({
  user: user.reducer,
  info: info.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
