import React, { useEffect } from 'react'
import LoginRegister from "./LoginRegister"
import Profile from "./Profile"
import styled from "styled-components";

const token = localStorage.getItem('token');

const API_URL = process.env.API_URL || 'http://127.0.0.1:8080'

const Home = () => {

    return ( 
    <>
    <StyledHome>
        <StyledText><h1>Home</h1></StyledText>
        <StyledStart>
            {
             token ? <Profile API_URL={API_URL} /> : <LoginRegister API_URL={API_URL} />
            }
        </StyledStart>
    </StyledHome>
    </>
    );
}
 
export default Home;

const StyledHome = styled.div`
display: flex;
flex-direction: column;
align-content: flex-start;
min-height: 100vh;
width: 100vw;
color: #bbe1c3;
// background-color: #a7cdbd;
background-color: #869d7a;
`;

const StyledText = styled.h1`
font-size: 1rem;
color: #ffb140;
padding-left: 1rem;
background-color: #a7cdbd;
`

const StyledStart = styled.div`
display: flex;
// flex-direction: column;
align-items: center;
justify-content: cebter;
margin-top: 2rem;
`;