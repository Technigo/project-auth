import React, { useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginForm } from 'components/LoginForm'
import { SignUpForm } from 'components/SignUpForm'
import { MemeVault } from 'pages/MemeVault'

const Wrapper = styled.main`
display: flex;
background: #302B27;
justify-content: center;
align-items: center;
flex-direction: column;
`

const ContentWrapper = styled.section`
display: flex;
flex-direction: column;
@media (min-width: 992px) {
  flex-direction: row;
}
`

const Text = styled.p`
font-size: 24px;
font-weight: bold;
color: #F5F3F5;
`

export const App = () => {
  const [username, setUsername] = useState()

  return (
    <Wrapper>
    <BrowserRouter>
      <Switch>
      
      <Route path='/' exact>
      <Text>Want to see some dank programmer memes? Sign up or login!</Text>
      <ContentWrapper>
      <SignUpForm/>
      <LoginForm setUsername={setUsername}/>
      </ContentWrapper>
      </Route>

      <Route path='/memevault' exact>
      <MemeVault username={username}/>
      </Route>
      </Switch>      
      </BrowserRouter>
      </Wrapper>
  )
}
