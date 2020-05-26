import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { LinkButton } from './Button'

export const FirstPage = () => {
  return (
    <ImageContainer>
      <ContentContainer>
        <Welcome>
          Do you want to come in?
        </Welcome>
        <ButtonContainer>
          <Redirect to="/login">
            <LinkButton title='Login' />
          </Redirect>

          <Redirect to="/signup">
            <LinkButton title='Sign Up' />
          </Redirect>
        </ButtonContainer>

      </ContentContainer>
    </ImageContainer>

  )
}

const ImageContainer = styled.main`
  background-image: url(${process.env.PUBLIC_URL + '/door.jpeg'});
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover; 
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Welcome = styled.h1`
  font-family: 'Carter One', cursive;
  text-align: center;
  color: #fff;
  font-size: 100px;
  width: 80%;

  @media (max-width: 950px) {
    font-size: 70px;
  }

  @media (max-width: 660px) {
    line-height: 80px;
  }

  @media (max-width: 375px) {
    font-size: 50px;
  }
`
const ButtonContainer = styled.div`
  display: flex,
  flex-direction: column;
  align-self: flex-end;
  margin: 4em 16em;

  @media (max-width: 950px) {
    margin: 2em 8em;
  }

  @media (max-width: 660px) {
    align-self: center;
    margin: 1em;
  }
`

const Redirect = styled(Link)`
  text-decoration: none;
`