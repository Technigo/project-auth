import React from 'react'
import { InnerWrapper, Button, TextWrapper } from '../assets/GlobalStyles'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <InnerWrapper>
          <TextWrapper>
          <h1>Error: Page not found</h1>
          <Link to="/login"><Button> GO TO LOGIN</Button></Link>
          </TextWrapper>
        </InnerWrapper>

    )

}