import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

import user from "./reducers/user"

import Main from './components/Main'
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Start from "./components/Start"

const reducer = combineReducers({
  user: user.reducer,
})
const store = configureStore({ reducer })
export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
