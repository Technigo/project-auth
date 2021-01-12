import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import img from '../assets/purple.jpg';
import InputField from './InputField';

const CreateUserContainer = styled.div`
  width: 35%;
  border-radius: 20px 0 0 20px;
  background-image: url(${img});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -5px 5px 5px grey;
`;

const Login = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 300px;
`;

const Title = styled.h1`
  align-self: flex-start;
  color: white;
  font-size: 36px;
  padding: 20px 0;
`;

const CreateUser = () => {
  return (
    <CreateUserContainer>
      <Login>
        <Title>CREATE USER</Title>
        <InputField title='Username' htmlFor='name' id='name' type='text' />
        <InputField title='Password' htmlFor='password' id='password' type='password' />
        <Button title='Sign Up'/>
      </Login>
    </CreateUserContainer>
  )
}

export default CreateUser;