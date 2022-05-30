import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Navbar = () => {

  const Navbar = styled.nav`
    background-color: pink;
    display: flex;
    justify-content: center;
    padding: 10px;
  `;

  const NavLinks = styled(Link)`
    margin: 10px;
    color: white;
    text-decoration: none;
  `;

  return (
    <div>
        <Navbar>
            <NavLinks to="/">Home</NavLinks>
            <NavLinks to="/signin">Sign in</NavLinks>
            <NavLinks to="/signup">Sign up</NavLinks>
            <NavLinks to="/secrets">User account</NavLinks>
        </Navbar>
    </div>
  )
}
