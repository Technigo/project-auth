import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container} from '../components/Container'
import { H1 } from '../components/TextStyles'

export const Welcome = () => {
  return (
    <Container>
      <H1>Welcome to the Biggest Secret Ever!</H1>
      <StyledLink to='/signup'>To Sign Up</StyledLink> 
      <StyledLink to='/login'>To Login</StyledLink>
    </Container>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
  border: solid 1px black;
  border-radius: 25px;
  color: black;
  padding: 15px;
  font-size: 50px;
  box-shadow: 2px 2px;
  margin-left: 10px;
  margin-bottom: 20px;
`