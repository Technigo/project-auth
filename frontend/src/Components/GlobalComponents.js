import styled from "styled-components";

export const OuterWrapper = styled.div`
background-color: whitesmoke;
width: 100%;
height: 150vh;
display: flex;
justify-content: center;
font-family: Arial, Helvetica, sans-serif;
`

export const InnerWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #E9E5D6;
width: 80%;
height: 60%;
margin-top: 15px;
border-radius: 10px;
`

export const Button = styled.button`
background-color: #E9E5D6;
border-radius: 20px;
border: #362706 4px solid;
margin: 10px;
padding: 10px;
font-size: 16px;

:hover {
    background-color: #464E2E;
    color: white;
}
`

export const Headline = styled.h2`
    font-size: 34px;

`