import styled from 'styled-components'


// WRAPPER

export const PageWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

// HEADER

export const Header = styled.div`
padding-top: 3rem;
margin: 0 auto;
max-width: 767px;
text-align: center;
`

export const H1 = styled.h1`
font-size: 3rem;
margin-bottom: 0;
color: #F3EFCC;
padding-left: 2rem;
padding-right: 2rem;
`

export const H2 = styled.h1`
font-size: 1.5rem;
margin-bottom: 0;
margin-top: 0;
color: #F3EFCC;
padding-left: 2rem;
padding-right: 2rem;
`

export const Preamble = styled.p`
font-size: 14px;
font-weight: 400;
line-height: 1.5rem;
margin-top: 1rem;
color: #F3EFCC;
padding-left: 2rem;
padding-right: 2rem;
`

//FORM

export const Form = styled.form`
padding: 2rem;
display: flex;
flex-direction: column;
width: 343px;
margin: 1rem auto;
background-color: #406343;
border-radius: 10px;

@media (max-width: 767px) {
  padding: 1rem;
}
`

export const Label = styled.label`
color: #F3EFCC;
width: 100%;
transition: 0.2s;
font-family: Roboto, sans-serif;
font-size: 1rem;
font-weight: 400;
margin-bottom: 0.5rem;
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
padding: 16px 16px;
border: 1px solid #F3EFCC;
background-color: inherit;
margin-bottom: 1rem;
outline: none;
:focus {
  ::placeholder {
    color: #32502E
  }
  padding: 16px 16px;
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

export const ShareButton = styled.button`
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

// SECRETS

export const SecretWrapper = styled.div`
display: grid;
grid-template-columns: repeat(1, 1fr);
gap: 1rem;
margin: 0 auto;
padding-top: 2rem;
padding-bottom: 2rem;
  @media (min-width: 767px) and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Secret = styled.div`
box-sizing: border-box;
padding: 1rem;
color: #406343;
background-color: #F3EFCC;
width: 343px;
min-height: 150px;
box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
border-radius: 8px;
display: flex;
flex-direction: column;
flex-wrap: wrap;
`

export const HeadingSpan = styled.div`
font-weight: 700;
font-size: 1.5rem;
margin: 0;
word-wrap: break-word;
white-space: pre-wrap;
width: 311px;
`

export const TextSpan = styled.div`
font-weight: 400;
font-size: 14px;
margin-top: 1rem;
word-wrap: break-word;
white-space: pre-wrap;
width: 311px;
`

// BUTTON LOGOUT

export const Button = styled.button`
margin: 0 auto;
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
width: 343px;
background-color: #406343;
:hover {
  background-color: #ECE7B4;
  color: #32502E;
}
`