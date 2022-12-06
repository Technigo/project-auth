import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <ul>
          <li>
            Sign up/log in
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  height: 20vh;
  display: flex;
  justify-content: end;
   li {
    font-size: 10px;
    background-color: blue;
    color: white;
    list-style: none;
    padding: 10px;
    border-radius: 10px;
   }
`