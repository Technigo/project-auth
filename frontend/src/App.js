import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './components/Main'
import Signin from './components/Signin'
import NotFound from './components/NotFound'

import user from './reducers/user'
import profiles from './reducers/profile'


const reducer = combineReducers({
  user: user.reducer,
  profiles: profiles.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}> 
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  )
}
