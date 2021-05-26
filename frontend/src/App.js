import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import MainPage from './pages/MainPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

import user from './reducers/user'
import travelInspo from './reducers/travelInspo'

const Main = styled.main`
  width: 100%;
`

const reducer = combineReducers({
  user: user.reducer,
  travelInspo: travelInspo.reducer
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <BrowserRouter>
      <Main>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
          </Switch>
        </Provider>
      </Main>
    </BrowserRouter>
  )
}

export default App