import React from 'react'
import { InnerWrapper } from '../assets/GlobalStyles'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <InnerWrapper>
          <Link to="/login"> GO TO LOGIN</Link>
          <h1>404</h1>
        </InnerWrapper>

    )

}