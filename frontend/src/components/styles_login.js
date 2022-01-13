import styled from 'styled-components'
import { HeartFillIcon, MailIcon, KeyIcon } from '@primer/octicons-react'


// HEADER

export const Header = styled.div`
max-width: 343px;
margin: 5rem auto;
`

export const H1 = styled.h1`
font-size: 2rem;
margin-bottom: 0;
margin-top: 0;
color: #F3EFCC;
`

export const H2 = styled.h2`
font-size: 1rem;
margin-top: 0.5rem;
color: #F3EFCC;
`

//RADIO BUTTONS

export const Radios = styled.div`
display: flex;
justify-content: space-between;
gap: 1rem;
align-items: center;
`

export const Radiowrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0 0.5rem;
// background-color: #F3EFCC;
height: 32px;
border-radius: 8px;
width: 100%;
`

export const RadioButton = styled.input`
// margin-right: 0.5rem;
margin-top: 0;
// display: none;
`

export const Radiogroup = styled.div`
border: 1px solid #F3EFCC;
display: inline-block;
margin: 0 auto;;
height: 32px;
border-radius: 8px;
// overflow: hidden;
max-width: 343px;
display: flex;
align-items: center;
text-align: center;
`

export const Radiolabel = styled.label`
width: 100%;
color: #F3EFCC;
transition: 0.2s;
font-family: Roboto, sans-serif;
font-size: 1rem;
font-weight: 400;
font-family: Roboto;
font-size: 1.175rem;
cursor: pointer;
`

export const HiddenRadioButton = styled.input.attrs({
  type: 'radio',
})`
  height: 25px;
  width: 25px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
`

export const RadioButtonTest = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  pointer-events: none;

  ${HiddenRadioButton}:checked + && {
    background-color: red;
  }
`

// SIGNUP & SIGNIN FORM

export const Form = styled.form`
padding: 2rem;

@media (max-width: 767px) {
  padding: 1rem;
}
`

export const FormWrapper = styled.div`
max-width: 343px;
background-color: #406343;
border-radius: 10px;
margin:  5rem auto;
box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`

export const Label = styled.label`
  color: #F3EFCC;
  width: 100%;
  transition: 0.2s;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
`

export const Flexboxinput = styled.div`
position: relative;
margin-top: 0.5rem;
display: flex;
align-items; center;
`

export const Heart = styled(HeartFillIcon)`
position: absolute;
left: 16px;
top: 1rem;
color: #F3EFCC;
`

export const Key = styled(KeyIcon)`
position: absolute;
left: 16px;
top: 1rem;
color: #F3EFCC;
`

export const Input = styled.input`
border-radius: 8px;
font-family: Roboto, sans-serif;
color: #F3EFCC;
font-size: 1rem;
font-weight: 400;
text-decoration: inherit;
text-transform: inherit;
// align-self: flex-end;
box-sizing: border-box;
width: 100%;
height: 3rem;
padding: 16px 48px;
border: 1px solid #F3EFCC;
background-color: inherit;
margin-bottom: 1rem;
outline: none;
:focus {
  ::placeholder {
    color: #F3EFCC
  }
  padding: 16px 48px;
  background-color: #32502E;
  border: none;
  ::placeholder {
    color: #F3EFCC;
  }
  :focus {
    color: #F3EFCC;
    font-size: 12px;
  }
}
`

// BUTTON

export const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 1rem;
`

export const Button = styled.button`
display: inline-block;
padding: 1rem;
border-radius: 8px;
text-decoration: none;
color: #ECE7B4;
font-family: Roboto;
font-size: 1rem;
font-weight: 500;
transition: 0.4s;
border: none;
width: 100%;
background-color: #32502E;
:hover {
  background-color: #ECE7B4;
  color: #32502E;
}
`