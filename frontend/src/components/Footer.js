import React from 'react'
import styled from 'styled-components/macro'

const FooterStyle = styled.div`
  margin-top: 0;
  font-size: 10px;
  color: #999999;
  display: flex;
  align-items: flex-end;

  &:a {
    text-decoration: none;
    cursor: pointer;
  }

  &:hover {
    color: #999999;
  }`

export const Footer = () => {
  return (
    <FooterStyle>
      <div>
        Made by Henrike & Peggy @<a href="https://blipsandclicks.com">blipsandclicks</a> during Technigo Bootcamp 2021.
      </div>
    </FooterStyle>
  )
}