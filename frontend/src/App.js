import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Login from 'components/Login'
import Main from 'components/Main'
import NotFound from 'components/NotFound'

import user from './reducers/user'
import thoughts from './reducers/thoughts'

const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
})

// const accessToken = useSelector((store) => store.user.accessToken)

const persistedStateJSON = localStorage.getItem("userItemsReduxState")
let preloadedState = {}

if (persistedStateJSON) {
  preloadedState = JSON.parse(persistedStateJSON)
}

const store = configureStore({reducer, preloadedState})

store.subscribe(() => {
  localStorage.setItem("userItemsReduxState", JSON.stringify(store.getState()))
})


export const App = () => {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
   
    
  )
}
