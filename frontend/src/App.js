import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

//Components
import Main from "./Components/Main"
import Login from "./Components/Login"
import NotFound from "./Components/NotFound"

//Redux reducers
import user from "./reducers/user"
import thoughts from "./reducers/thoughts"





const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
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
    </BrowserRouter>
    </Provider>

  )
  
}
