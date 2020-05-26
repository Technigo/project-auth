import React from 'react'
import styled from 'styled-components/macro'


const Title = styled.h1`
  background-color: cornflowerblue;
  padding: 2em 3em;
  margin-top: 0;
  color: white;
  text-align: center;
  font-size: 1.2em;
  text-transform: uppercase;
  border-radius: 6px 6px 0 0;
`


export const Headline = ({title}) => {
  return (
    <Title>
      {title}
    </Title>
  )
}