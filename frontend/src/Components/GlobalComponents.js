import styled from "styled-components";

export const OuterWrapper = styled.div`
background-color: whitesmoke;
width: 100%;
height: 150vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-start;
`

export const InnerWrapper = styled.div`
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #E9E5D6;
width: 80%;
height: 60%;
margin-top: 8em;
border-radius: 10px;
`

export const Button = styled.button`
background-color: whitesmoke;
border-radius: 20px;
border: lightsalmon 4px solid;
margin: 10px;
padding: 10px;
font-size: 16px;

:hover {
    background-color: cornflowerblue;
}
`

export const Headline = styled.h2`
    font-size: 24px;
    color: red;
`
export const Title = styled.h3`
    font-size: 20px;
    color: blue;
`
export const Description = styled.p`
    font-size: 16px;
    color: green;
`