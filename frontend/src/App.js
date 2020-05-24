import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Welcome } from './pages/Welcome'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Secret } from './pages/Secret'


export const App = () => {
  return (
    <OverallPage>
      <BrowserRouter>
        <Switch>
          <Route path='/'exact>
            <Welcome />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/secret'>
            <Secret />
          </Route>
        </Switch>
      </BrowserRouter>
    </OverallPage>
  )
}

const OverallPage = styled.section`
  display: flex;
  width: 100%
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`