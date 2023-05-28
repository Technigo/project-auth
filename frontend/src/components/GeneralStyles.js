import styled from 'styled-components/macro'

///////////////////////////MAIN STYLES/////////////////
export const OuterWrapper = styled.div`
width: 100%;
height: ${(props) => (props.vh100 ? '100vh' : '100%')};
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
background-color: #7A4069;
`

export const InnerWrapper = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #CA4E79;
padding: 1rem;
gap: 1rem;
margin-top: 1rem;
text-align: center;

@media (min-width: 667px) {
    margin-top: 3rem;
    padding: 3rem;
    gap: 2rem;
    width: 40%;
}

@media (min-width: 1024px) {
    margin-top:3rem;
    padding: 3rem;
    gap: 2rem;
    width: 30%;
}

`

export const Button = styled.button`
  position: relative;
  background-color: #7A4069;
  border-radius: 4em;
  font-size: 16px;
  color: white;
  padding: 0.4em 1em;
  cursor:pointer;
  user-select:none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */


  :after {
    content: "";
  display: block;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 10px 40px white;
}

:active:after {
    box-shadow: 0 0 0 0 white;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top:0;
  opacity: 1;
  transition: 0s;
}

:active {
  top: 1px;
}

`
export const Form = styled.form`
display: flex; 
flex-direction: column;
justify-content: center;
align-items: center; 
gap: 0.7rem;
`


export const Paragraph = styled.p`
font-size: 1rem;
color: black;
font-weight: ${(props) => (props.bold ? '600' : '')};

@media (min-width: 667px) {
    font-size: 1.1rem;
}

@media (min-width: 1024px) {
    font-size: 1.1rem;
}
`

export const Label = styled.label`
font-size: 1rem;
color: black;

@media (min-width: 667px) {
    font-size: 1.1rem;
}

@media (min-width: 1024px) {
    font-size: 1.1rem;
}
`

//////////LOGIN//////////////
export const RadioButtonWrapper = styled.div`
display: flex; 
flex-direction: row;
gap: 0.7rem;

`

export const DescriptionWrapper = styled.div`
display: flex; 
flex-direction: column;
justify-content: center;
align-items: center; 
gap: 1rem;
text-align: center; 

`

////////////MAIN/////////////
export const MessageWrapper = styled.div`
margin: 0;
background-color: #FFC18E;
border-radius: 50px;
padding: 0.7rem;
text-align: center; 
width: 12rem;
word-wrap: break-word;
color: #513252; 

@media (min-width: 667px) {
    width: 15rem;
}

@media (min-width: 1024px) {
    width: 20rem;
}

`
export const Header = styled.h1`
font-weight: 700;
font-size: 1.3rem;
color: #513252;

@media (min-width: 667px) {
    font-size: 1.5rem;
}

@media (min-width: 1024px) {
    font-size: 2rem;
}
`

export const TextArea = styled.textarea`
width: 12rem; 

@media (min-width: 667px) {
    width: 13rem;
    height: 3rem;
}

@media (min-width: 1024px) {
    width: 15rem;
    height: 3rem;
}

`

