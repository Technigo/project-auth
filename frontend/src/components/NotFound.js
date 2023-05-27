import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro';
import { Container } from '@mui/material';

export const NotFound = () => {
  return (
    <Container>
      <Link to="/">Go Home</Link>
      <BackgroundImg alt="Page not found" />
      {/* <Typography variant="h1">404 - Looks like you are lost.</Typography> */}
    </Container>
  )
}

const BackgroundImg = styled.div`
    background-size:cover;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    z-index: -1;
`