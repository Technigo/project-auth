import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Header from 'components/Header'
import LoginForm from 'components/LoginForm'
import Footer from 'components/Footer'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
`

export const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <LoginForm />
      <Footer />
    </div>
  )
}
