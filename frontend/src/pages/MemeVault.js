import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { ImageDisplay } from './components/Images'

const Wrapper = styled.section``

const Text = styled.h3`
  font-size: 20px;
  color: #f5f3f5;
`

export const MemeVault = () => {
  return (
    <Wrapper>
      <Text>
        Hey! You made it. Scroll down to take part of my private programmer
        memestash
      </Text>
      {/* <ImageDisplay /> */}
      <Link to={`/`}>Tillbaka</Link>
    </Wrapper>
  )
}
