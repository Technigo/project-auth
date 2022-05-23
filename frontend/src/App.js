import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import Start from "./components/Start"
import SignIn from "./components/SignIn"

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}
