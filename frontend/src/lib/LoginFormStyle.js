import styled from 'styled-components';
import img from '../assets/purple.jpg';

export const LoginContainer = styled.div`
width: 100%;
height: 100vh;
background-image: url(${img});
background-size: cover;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: -5px 5px 5px grey;

  @media (min-width: 667px) {
    height: auto;
  }

  @media (min-width: 1024px) {
    width: 35%;
    border-radius: 20px 0 0 20px;
    max-width: 500px;
    height: 600px;
  }
`;

export const Title = styled.h1`
align-self: flex-start;
color: white;
font-size: 36px;
padding: 20px 0;
`;

export const Login = styled.form`
display: flex;
flex-direction: column;
align-items:center;
width: 300px;
`;

export const LoginErrorMessage = styled.p`
    color: ${props => props.color || '#fff' };
`