import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { Form } from './components/Form'
import { Status } from './components/Status'
import { Footer } from './components/Footer'
import { Container } from './lib/Container'
import { user } from './reducers/user'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Form />
        <Status />
        <Footer />
      </Container>
    </Provider>
  )
}