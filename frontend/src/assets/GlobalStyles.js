import styled, { createGlobalStyle, css } from "styled-components/macro";
import backgroundImage from "../assets/knit-background.jpg"
export const GlobalStyles = createGlobalStyle`


// background and font colour
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
}`

// Main wrapper, decides width of all content
export const InnerWrapper = styled.div`
   width: 60%;
   margin: 0 auto;
   min-height: 100vh;
`

//Wrapper for start page
export const TextWrapper = styled.div`
    width: 100%;
    margin: 20vh auto;
    background-color: rgb(64, 43, 34, 0.9);
    border-radius: 10px;
    padding: 25px;
`

//Wrapper for buttons on start page
export const Buttonwrapper = styled.div`
    display: flex; 
    justify-content: space-evenly;
`
// Main styling for buttons and props for submit and redirect buttons
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

    ${(props) =>
    props.submit &&
    css`
      margin: 5% 0 7% 0;
      width: 7rem;
    `};

    ${(props) =>
    props.redirect &&
    css`
      font-size: 1rem;
      width: 50%;
      margin-left: 5%;

      @media (max-width: 725px) {
        width: 90%;
        margin-top: 5%;
      }
    `};
`

// Wrapper for login and register page
export const UserInputWrapper = styled.div`
    width: 60%;
    margin: 20vh auto;
    padding: 5% 10%;
    border-radius: 15px;
    background-color: rgb(64, 43, 34, 0.9);
` 

// Styling for form with username and password input (login & register page)
export const Form = styled.form`
display: flex;
flex-direction: column;
line-height: 3;
`
