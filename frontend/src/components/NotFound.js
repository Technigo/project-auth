import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper, TextContainer } from './GlobalStyles';

const NotFound = () => {
    return(
    <>
    <Wrapper>   
        <TextContainer>Are you lost, my friend? Please go back to login page!</TextContainer>
        <LogoutLink to="/login">Login Page</LogoutLink>
    </Wrapper> 
    </>
    )
}

export default NotFound;

const LogoutLink = styled(Link)`
  margin: 30px;
  transition: transform .5s;
  text-decoration: none;
  border: none;
  background-color: #4b4f3e;
  color: white;
  padding: 10px 15px;
    
  &:hover{
    transform: scale(2);
    }
`