import React from 'react'
import styled from 'styled-components/macro'

const FooterStyle = styled.div`
  margin: 0;
  font-size: 10px;
  display: flex;
  align-items: flex-end;
  background: #fff;

  &:a {
    text-decoration: none;
    cursor: pointer;
  }

  &:hover {
    color: #3d99f5;
  }`

export const Footer = () => {
  return (
    <FooterStyle>
      <div>
        Made by Henrike & Peggy @<a href="https://blipsandclicks.com">blipsandclicks</a> during Technigo Bootcamp 2021 for educational purposes.
      </div>
    </FooterStyle>
  )
}
