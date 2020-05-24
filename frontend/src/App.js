import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Welcome } from './pages/Welcome'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'


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
            <h1>Secrets Page</h1>
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