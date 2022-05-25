import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from 'components/Login'
import Notes from 'components/Notes'
import NotFound from 'components/NotFound'

import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import user from 'reducers/user'
import notes from 'reducers/notes'

const reducer = combineReducers({
  user: user.reducer,
  notes: notes.reducer
})

const store = configureStore({reducer})

export const App = () => {
  return (
    <Provider store ={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/notes' element={<Notes/>}></Route>
          <Route path='*' element={<NotFound/>}></Route> 
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
