import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { Content } from './components/Content'
import { StartPage } from './components/StartPage'

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

export const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
