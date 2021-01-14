import React from 'react';
import styled from 'styled-components'
import img from '../assets/purple.jpg'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #F9E9FA;
`;

export const LoginContainer = styled.div`
width: 35%;
border-radius: 20px 0 0 20px;
background-image: url(${img});
background-size: cover;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: -5px 5px 5px grey;
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