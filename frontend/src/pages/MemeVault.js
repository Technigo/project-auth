import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Images } from '../components/Images' 

const Wrapper = styled.section`

`

const Text = styled.h3`
font-size: 20px;
color: #F5F3F5;
`

export const MemeVault = ({ username }) => {
  return (

    <Wrapper>
      <Text>Hey! You made it. Scroll down to take part of my private programmer memestash</Text>
      <Images />
      <Link to={`/`}>Tillbaka</Link>
    </Wrapper>
  )
}
