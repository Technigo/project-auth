import React from 'react';
import styled from 'styled-components/macro'
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Batman } from '../GlobalStyles';
import { Link } from 'react-router-dom'

export const Main = () => {
  return (
    <OuterWrapper>
    <InnerWrapper>
        <Batman />
        <Headline><span>The Batcave</span></Headline>
        <p>Sign up to get access to all the dreamy content! 🦄</p>
        <ButtonLink to="/signup">
            <Buttons type="button">Sign up</Buttons>
        </ButtonLink>
        <p>Already a member? 😎 Log in to your account.</p>
        <ButtonLink to="/login">
            <Buttons type="button">Log in</Buttons>
        </ButtonLink>
    </InnerWrapper>
    </OuterWrapper>
  );
}


const ButtonLink = styled(Link)`
 width: 100%;
`;

const Headline = styled.h1`
    color: white; 
    width: 100%; 
    text-align: center; 
    border-bottom: 2px solid white; 
    line-height: 0.1em;
    margin: 10px 0 20px;

span{
    background: #9fafd3;
    padding:0 10px;
}

`;
