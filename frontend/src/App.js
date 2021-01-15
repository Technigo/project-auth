import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import styled from 'styled-components'

import { Register } from './components/Register'
import { SignIn } from './components/SignIn'
import { LoginStatus } from './components/LoginStatus'

import { user } from './reducers/user'


const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Switch = styled.a`
  text-align: center;
  margin: auto;
  background-color: inherit;
  text-decoration: none;
  color: #454545;
`

export const App = () => {
  const [alreadyMember, setAlreadyMember] = useState(false)

  return (
    <Provider store={store}>
      <Container>
        {!alreadyMember && <Register />}
        {alreadyMember && <SignIn />}
        <Switch href='#' onClick={() => setAlreadyMember(!alreadyMember)}>
          <p>{alreadyMember ? 'Not yet a member?' : 'Already a member?'}</p>
        </Switch>
        <LoginStatus />
      </Container>
    </Provider>
  )
}
