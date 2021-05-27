import React from 'react'
import { Provider } from 'react-redux'
import {configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { Content } from './components/Content'
import { StartPage } from './components/StartPage'

import user from './reducers/user'

const Main = styled.main`
display: flex;
flex-direction: column;
height: 100vh;
width: 100vw;
justify-content: center;
align-items: center;
background-image: linear-gradient(#CBC7FE, #B9DEFF);
box-sizing: border-box;
font-family: "Now Bold";
color: #6A7885;
`

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Main>
            <Route path="/" exact>
              <StartPage />
            </Route>
            <Route path="/login" exact>
              <LogIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/content" exact>
              <Content />
            </Route>
          </Main>
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
