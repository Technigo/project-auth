import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './components/Main'
import LogIn from './components/Login'
import NotFound from './components/NotFound'

import user from './reducers/user'
import secrets from './reducers/secrets'

const reducer = combineReducers({
  user: user.reducer,
  secrets: secrets.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
  </Provider>
  )
}
