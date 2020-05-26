import React from 'react'
import styled from 'styled-components'

export const LinkButton = ({ title }) => {
  return (
    <Container>
      <TextLabel>
        {title}
      </TextLabel>
    </Container>)
}

const Container = styled.button`
  display: flex;
  width: 120px;
  justify-content: center;
  background: #ba913a;
  border: none;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;

  &:hover {
    background: #916e21;
  }
`

const TextLabel = styled.p`
  align-items: center;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin: 0;
`