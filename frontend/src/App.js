import React from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import styled from 'styled-components'

import Login from 'components/Login'
import Main from 'components/Main'
import NotFound from 'components/NotFound'
import Start from 'components/Start'

import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import user from 'reducers/user'
import thoughts from 'reducers/thoughts'

const reducer = combineReducers({
  user: user.reducer,
  thougts: thoughts.reducer
})

const store = configureStore({reducer})



export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>

      {/* <Link to="/start"><Logo>Wanna know a secret?</Logo></Link> */}
  <Wrapper>
      <Logo>Wanna know a secret?</Logo>

      <LinkWrapper>
      <LoginLink to="/login">Login / Register</LoginLink>
      <MainLink to="/main">Main</MainLink>
      </LinkWrapper>
</Wrapper>
     
      <Routes>
      <Route path="start" element={<Start />}/>
      <Route path="login" element={<Login />}/>
      <Route path="main" element={<Main />}/>
      <Route path="notfound" element={<NotFound />}/>

      </Routes>

      </BrowserRouter>
      </Provider>
  )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
width: 100vw;
align-items: center;
`

const Logo = styled.h1`
font-family: 'Shrikhand', cursive;
text-shadow: 5px 5px yellow;
font-size: 70px;
color: darkcyan;
text-align: center;
margin-bottom: 10px;
margin-top: 10px;
`

const LinkWrapper = styled.div`
display: flex;
`

const LoginLink = styled(Link)`
font-family: monospace;
margin-right: 50px;
margin-bottom: 20px;
color: black;

&:hover {
  color: yellow;

  
  &:active {
    color: pink;
  }
  /* &:visited {
      color: black;
    } */
}
`

const MainLink = styled(LoginLink)`
margin-right: 0;
`
