import styled from 'styled-components'

///////////////////////////MAIN STYLES/////////////////
export const OuterWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const InnerWrapper = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: aliceblue;
padding: 1rem;
`

export const Button = styled.button`
  position: relative;
  background-color: black;
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
gap: 1rem;

`

//////////LOGIN//////////////
export const RadioButtonWrapper = styled.div`
display: flex; 
flex-direction: row;
gap: 0.7rem;

`

