import React  from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import styled from 'styled-components'

import { LoginForm } from './components/LoginForm'
import { user } from './reducers/user'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {
  return (
    <MainContainer>
      <Provider store={store}>
        <LoginForm />
      </Provider>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  height: 600px;
  align-items: center;
  justify-content: center;
`