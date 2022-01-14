import styled from 'styled-components'
import { HeartFillIcon, KeyIcon } from '@primer/octicons-react'


// HEADER

export const Header = styled.div`
max-width: 343px;
margin: 7rem auto 2rem auto;
`

export const H1 = styled.h1`
font-size: 2rem;
margin-bottom: 0;
margin-top: 0;
color: #F3EFCC;
`

export const H2 = styled.h2`
font-size: 1rem;
line-height: 1.5rem;
margin-top: 2rem;
font-weight: 400;
color: #F3EFCC;
`

export const P = styled.p`
font-size: 1rem;
color: #F3EFCC;
margin-top: 0;
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
margin:  2rem auto;
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
gap: 1rem;
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