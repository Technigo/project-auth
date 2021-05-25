import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled.button`
  width: 150px;
  font-size: 16px;
  color: #6A7885;
  height: 40px;
  margin: 10px;
  background-color: #CAEBF2;
  border: 1px solid #9099A5;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 7px 7px white, 7px 7px 0px 1px #9099A5;
  &:hover {
    background-color: rgb(203,200,254);
  }
`