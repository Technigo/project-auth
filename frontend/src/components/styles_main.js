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
font-size: 4rem;
margin-bottom: 0;
color: #F3EFCC;
`

export const H2 = styled.h2`
font-size: 1rem;
font-weight: 400;
line-height: 1.5rem;
margin-top: 0.5rem;
color: #F3EFCC;
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
height: 220px;
box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
border-radius: 8px;
display: flex;
flex-wrap: wrap;
`

export const HeadingSpan = styled.span`
font-weight: 700;
font-size: 1.5rem;
margin: 0;
`

export const TextSpan = styled.span`
font-weight: 400;
font-size: 14px;
margin: 0;
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