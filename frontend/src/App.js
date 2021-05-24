import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import styled from 'styled-components'

import user from './reducers/user'
import travelInspo from './reducers/travelInspo'

import Content from './components/Content'
import RegistrationForm from './components/RegistrationForm'
import SignInForm from './components/SignInForm'
import SignOutButton from './components/SignOutButton'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const reducer = combineReducers({
  user: user.reducer,
  travelInspo: travelInspo.reducer
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <Provider store={store}>
      <Main>
        <RegistrationForm />
        <SignInForm />
        <Content />
        <SignOutButton />
      </Main>
    </Provider>
  )
}

export default App