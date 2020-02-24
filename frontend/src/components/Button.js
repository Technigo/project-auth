import React from 'react'
import styled from 'styled-components'

const ReusableButton = styled.button`
height: 30px;
width: 70px;
border: 2px solid black
border-radius: 15px;
margin: 0;
background: #576CA8;
`

export const Button = ({ onClick, title }) => (
  <ReusableButton onClick={onClick}>{title}</ReusableButton>
)