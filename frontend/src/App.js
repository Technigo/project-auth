import React, { useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginForm } from 'components/LoginForm'
import { SignUpForm } from 'components/SignUpForm'
import { MemeVault } from 'pages/MemeVault'

const Wrapper = styled.main`
display: flex;
justify-content: center;
align-items: center;
`

const Text = styled.p`
font-size: 24px;
font-weight: bold;
`

export const App = () => {
  const [username, setUsername] = useState()

  return (
    <Wrapper>
    <BrowserRouter>

      <Switch>
      <Route path='/' exact>
      <Text>Want to see some dank programmer memes? Sign up or login!</Text>
      <SignUpForm/>
      <LoginForm setUsername={setUsername}/>
      </Route>

      <Route path='/memevault' exact>
      <MemeVault username={username}/>
      </Route>

      </Switch>      
      </BrowserRouter>
      </Wrapper>
    
  )
}
