import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    margin: 0 auto; 
    }
    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        font-family: 'Noto Serif', serif;
        background-color: #c2bebb;
    }
`

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Button = styled.button`
    font-family: 'Noto Serif', serif;
    margin: 30px auto;
    padding: 10px 15px;
    border: none;
    background-color: #4b4f3e;
    color: white;
    transition: transform 0.5s ease 0s;
   
    &:hover{
        transform: scale(1.2);
    }

`
export const TextContainer = styled.div`
    margin: 100px 50px 20px;
    text-align: justify;
    border: 2px solid #4b4f3e;
    padding: 30px;

    h1, h2, p {
        margin-bottom: 20px;
    }
`