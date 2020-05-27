import React from 'react'
import styled from 'styled-components/macro'


const ButtonInput = styled.button`
  margin-top: 0;
  color: #4f4f4f;
  text-align: center;
  font-size: 1.2em;
  font-size: 0.825rem;
  text-align: center;
  height: 2.5em;
  margin-top: 1em;
  border-radius: 300px;
  &:hover {
    background: palevioletred;
    color: white;
  }
`
const InputButton = styled.input`
  margin-top: 0;
  color: #4f4f4f;
  text-align: center;
  font-size: 1.2em;
  font-size: 0.825rem;
  text-align: center;
  height: 2.5em;
  margin-top: 1em;
  border-radius: 300px;
  &:hover {
    background: palevioletred;
    color: white;
  } 
`

export const Button = ({ title }) => {
  return (
    <ButtonInput>
      {title}
    </ButtonInput>
  )
}

export const TestButton = ({ title }) => {
  return (
    <>
      <InputButton>
        {title}
      </InputButton>
    </>
  )
}