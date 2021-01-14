import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { user } from './reducers/user'
import { Form } from './components/Form'
import { Container } from './lib/Container'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

// use App as our "page"
export const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Form />
        {/* <Status /> */}
        {/* <Footer /> */}
      </Container>
    </Provider>
  )
}