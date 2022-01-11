import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: beige;
`

// import { combineReducers, configureStore } from '@reduxjs/toolkit'

// const reducer = combineReducers({
//   todos: todos.reducer
// })

// const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        <Routes>
          <Route path="/" exact element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/404" component={NotFound} />
        <Navigate to="/404" /> */}
        </Routes>
      </MainContainer>
    </BrowserRouter>
  )
}
