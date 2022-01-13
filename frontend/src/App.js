import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from '@reduxjs/toolkit'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import user from './reducers/user'
import Main from './pages/Main'

const reducer = combineReducers({
  user: user.reducer,
})
const persistedState = localStorage.getItem('redux')
  ? JSON.parse(localStorage.getItem('redux'))
  : {}

const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  localStorage.setItem("redux", JSON.stringify(store.getState()));
})

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
