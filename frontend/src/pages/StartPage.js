import React, {useState} from 'react'
import { InnerWrapper, TextWrapper, Buttonwrapper, Button } from '../assets/GlobalStyles'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StartPage = () => {

    return (
        <InnerWrapper>
          <TextWrapper>
            <Secondheader>Welcome to</Secondheader>
            <h1>The Secret Society of Arts and Craft</h1>
            <Buttonwrapper>
              <Link to="/login"><Button>Log in</Button></Link>
              <Link to="/register"><Button>Register</Button></Link>
            </Buttonwrapper>
          </TextWrapper>
   
        </InnerWrapper>

    )
}


const Secondheader = styled.h1`
  font-size: 1rem;
`

// Photo by Pavel Danilyuk: https://www.pexels.com/photo/knitting-needles-on-a-brown-yarn-5788150/