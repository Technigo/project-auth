import React from "react"
import styled from 'styled-components'

const StyledButton = styled.button`
  font-family: 'Josefin Sans', sans-serif;
  background: #FcfAf1;
  color:  #254b62;
  border: 2px solid #cff532;
  text-transform: uppercase;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 22px;
  display: block;
  margin: 25px 0 0 10px;
  width: fit-content;
`

export const Button = ({ title, onClick }) => (
  <StyledButton onClick={onClick}>{title}</StyledButton>
)