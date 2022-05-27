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
import content from 'reducers/content'

const reducer = combineReducers({
  user: user.reducer,
  thougts: content.reducer
})

const store = configureStore({reducer})



export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>

      {/* <Link to="/start"><Logo>Wanna know a secret?</Logo></Link> */}
 
     
      <Routes>
      <Route path="/" element={<Start />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/main" element={<Main />}/>
      <Route path="/notfound" element={<NotFound />}/>

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
margin-top: 10px;
`

const Logo = styled.h1`
font-family: 'League Spartan', sans-serif;
/* text-shadow: 5px 5px yellow; */
font-size: 20px;
color: black;
text-align: center;
margin-bottom: 10px;
margin-top: 10px;

@media (min-width: 768px) {
font-size: 40px;
margin-top: 25px;
}
`

const LinkWrapper = styled.div`
display: flex;
flex-direction: row;


`

const Text = styled.p`
font-family: 'League Spartan', sans-serif;
margin-right: 20px;
margin-top: 0;
animation: pulse 2s infinite;
  
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      
    }
  
    70% {
      transform: scale(1.4);
      color: #E204AB;
     
    }
  
    100% {
      transform: scale(0.95);
      
    }
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`

const LoginLink = styled(Link)`
font-family: 'League Spartan', sans-serif;
/* margin-right: 50px; */
margin-bottom: 20px;
color: black;

&:hover {
  color: lightcoral;

  
  &:active {
    color: pink;
  }
  /* &:visited {
      color: black;
    } */
}

@media (min-width: 768px) {
  font-size: 20px;
}
`

const MainLink = styled(LoginLink)`
margin-right: 0;
`
