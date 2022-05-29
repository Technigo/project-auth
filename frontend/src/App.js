import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { Login } from './components/Login'
import { Main } from './components/Main'
import { NotFound } from './components/NotFound'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path='/not' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
