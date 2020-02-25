import React from 'react'
import styled from 'styled-components'

const ReusableButton = styled.button`
height: 30px;
width: 70px;
margin-left: 15px;
background: #576CA8;
&:hover {
  background: #274690;
  cursor: pointer;
  transition: 0.7s;
}
&:focus {
  border: 3px solid #F5F3F5;
}
`

export const Button = ({ onClick, title }) => (
  <ReusableButton onClick={onClick}>{title}</ReusableButton>
)