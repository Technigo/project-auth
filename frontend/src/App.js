import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { Form } from './components/Form'
import { Secrets } from './components/Secrets'
import { Status } from './components/Status'
import { Footer } from './components/Footer'
import { Container } from './lib/Container'
import { user } from './reducers/user'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

// use App as our "page"
export const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Form />
        <Secrets />
        <Status />
        <Footer />
      </Container>
    </Provider>
  )
}