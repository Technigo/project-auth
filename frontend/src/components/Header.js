import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      {/* <nav>
        <ul>
          <li>
            Sign up/log in
          </li>
        </ul>
      </nav> */}
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  height: 20vh;
  position: relative;
  border-bottom: solid 1px red;

   li {
    font-size: 10px;
    background-color: blue;
    color: white;
    list-style: none;
    padding: 10px;
    border-radius: 10px;
   }
`
const Logo = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  left: 10vw;
  bottom: -35px;
`