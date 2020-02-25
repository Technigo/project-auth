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

const Title = styled.h1`
font-size: 24px;
font-weight: 700;
color: #F5F3F5;
margin-left: 50px;
@media (min-width: 992px) {
  max-width: 550px;
  margin: 20px;
}
`

const Instruction = styled.h3`
font-size: 20px;
color: #F5F3F5;
`

export const App = () => {
  const [username, setUsername] = useState()

  return (
    <Wrapper>
    <BrowserRouter>
      <Switch>
      
      <Route path='/' exact>
      <Title>Want to see some dank programmer memes?</Title>
      <Instruction>Sign up or login!</Instruction>
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
