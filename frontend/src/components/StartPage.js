import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { StyledButton } from '../components/StyledBtn'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const StartPage = () => {
  return (
    <Wrapper>
      <h1>Welcome to the cute cats page!</h1>
      <p>Sign up or log in to see all the cute kittens.</p>
      <ButtonContainer>
        <Link to="/login">
          <StyledButton>Log in</StyledButton>
        </Link>
        <Link to="/signup">
          <StyledButton>Sign up</StyledButton>
        </Link>
      </ButtonContainer>
  </Wrapper>
  )
}