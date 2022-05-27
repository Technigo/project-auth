import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Start = () => {

  return (
  <Wrapper>
      <Logo>Wanna know a secret?</Logo>

      <LinkWrapper>
      <LoginLink to="/login">Login / Register</LoginLink>
      <MainLink to="/main">Main</MainLink>
      </LinkWrapper>
</Wrapper>
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

@media (min-width: 768px) {
  font-size: 100px;
}
`

const LinkWrapper = styled.div`
display: flex;
justify-content: space-between;
`

const LoginLink = styled(Link)`
font-family: 'League Spartan', sans-serif;
margin-right: 50px;
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

export default Start