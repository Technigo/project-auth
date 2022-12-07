import styled from 'styled-components'

export const Title = styled.h1 `
font-size:20px;
`

export const Wrapper = styled.div `
// border: solid green 2px;
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

export const Form = styled.form `
background-color: pink;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 50vw;
height: auto;
padding: 20px;
box-shadow: 8px 11px 5px -6px rgba(0,0,0,0.75);
-webkit-box-shadow: 8px 11px 5px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 8px 11px 5px -6px rgba(0,0,0,0.75);
`


export const Input = styled.input `
// border: solid blue 2px;
display: flex;
margin: 5px;
padding: 5px;
border-radius: 5px;

`

export const Button = styled.button `
border: none;
border-radius: 10px;
padding: 5px;
display: flex;
background: lightgrey;
&:hover {
    background: hotpink;
}
`