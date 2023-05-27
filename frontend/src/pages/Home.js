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
// color styr please log in samt already registered/no account
`;

const StyledText = styled.h1`
font-size: 1rem;
color: #ffb140;
padding-left: 1rem;
background-color: rgba(167, 205, 189, 0.5);

// media-q lyssnar ej

@media (max-width 664px) {
    font-size: 0.7rem;
    padding-left: 0.7rem
    }
`

const StyledStart = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 2rem;
`;