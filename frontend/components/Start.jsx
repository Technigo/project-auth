import React from "react"
import { Link } from "react-router-dom"

import styled from "styled-components"

const Container = styled.div`
  display: grid;
  place-items: center;
`

const WelcomeText = styled.h1`
  text-align: center;
`

const ButtonContainer = styled.p`
  display: flex;
  justify-content: center;
  text-align: center;
  a {
    color: white;
    text-decoration: none;
    font-size: 22px;
  }
`

const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  background-color: #000;
  margin-right: 1rem;
`

const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  background-color: #000;
  margin-left: 1rem;
`

const Start = () => {
  return (
    <Container>
      <WelcomeText>Welcome to the tunnel</WelcomeText>
      <ButtonContainer>
        <PrimaryButton>
          <Link to="/signup">Sign Up</Link>
        </PrimaryButton>
        <SecondaryButton>
          <Link to="/signin">Sign In</Link>
        </SecondaryButton>
      </ButtonContainer>
    </Container>
  )
}

export default Start
