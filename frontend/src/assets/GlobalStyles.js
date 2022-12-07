import styled, { createGlobalStyle } from "styled-components/macro";
import backgroundImage from "../assets/knit-background.jpg"
export const GlobalStyles = createGlobalStyle`

html {
    background-image: url(${backgroundImage});
    background-repeat: no-repeat; 
    background-size: cover;
    background-position: center center;
    min-height: 100%;
    background-attachment: fixed; 
    color: #DEDCDA;
    
}

body {
    font-family: 'Aboreto', cursive;

}

`

export const InnerWrapper = styled.div`
   width: 60%;
   margin: 0 auto;
   min-height: 100vh;
`

export const TextWrapper = styled.div`
    width: 100%;
    margin: 20vh auto;
    background-color: rgb(64, 43, 34, 0.5);
    border-radius: 10px;
    padding: 25px;
`

export const Buttonwrapper = styled.div`
    display: flex; 
    justify-content: space-evenly;
`

export const Button = styled.button`
    background-color: inherit;
    color: #DEDCDA;
    border: 2px solid #DEDCDA;
    padding: 10px 15px;
    border-radius: 25px;
    font-size: 1.2rem;
    width: 9rem;
    font-family: 'Aboreto', cursive;

    :hover {
        cursor: pointer;
        background-color: #DEDCDA;
        color: rgb(64, 43, 34);
    }
`
export const UserInputWrapper = styled.div`
    width: 100%;
    margin: 20vh auto;
    border: 2px solid #DEDCDA;
    border-radius: 15px;
    padding: 15px;
` 
