import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaChevronCircleLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <BackgroundImage>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Page not found</h1>
      <StyledContainer>
        <StyledLink to='/'>
          <FaChevronCircleLeft />
          <p style={{ margin: 4 }}>Back</p>
        </StyledLink>
      </StyledContainer>
    </BackgroundImage>
  )
}

export default NotFound

const BackgroundImage = styled.main`
  background-image: url('/assets/space_background2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 100%;
  width: 100%;
  font-size: 16px;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  @media (min-width: 768px) {
    font-size: 27px;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4a3b61;
  font-weight: 700;
  display: flex;
  align-items: center;
`
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
