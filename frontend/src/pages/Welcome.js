import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Welcome = () => {
  return (
    <div>
      <h1>Welcome to the Biggest Secret Ever!</h1>
      <StyledLink to='/signup'>To Sign Up</StyledLink> 
      <StyledLink to='/login'>To Login</StyledLink>
    </div>
  )

}

const StyledLink = styled(Link)`
  text-decoration: none;
  border: solid 1px black;
  padding: 5px;
`