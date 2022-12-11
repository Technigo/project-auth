import React from "react";
import styled from "styled-components";


const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Jessika's Message Board</Logo>
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
  left: 5%;
  bottom: -35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  border: white solid 5px;

  @media (min-width: 668px) and (max-width: 1024px) {
    left: 20%;
  }
  @media (min-width: 1025px){ 
    left: 20%;
  }
`