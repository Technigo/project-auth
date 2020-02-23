import React from 'react'
import styled from 'styled-components'

const ReusableButton = styled.button`
`

export const Button = ({ onClick, title }) => (
  <ReusableButton onClick={onClick}>{title}</ReusableButton>
)