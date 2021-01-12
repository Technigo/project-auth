import React from 'react'
import styled from 'styled-components'

import Button from './Button'
import InputField from './InputField'

const LoginContainer = styled.div`
  border-radius: 0 20px 20px 0;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 5px 5px 5px grey;
`;

const Title = styled.h1`
  align-self: flex-start;
  color: purple;
  font-size: 36px;
  padding: 20px 0;
`;

const Login = styled.form`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 300px;
`;

const LoginForm = () => {
  return (
    <LoginContainer>
      <Login>
        <Title>LOGIN</Title>
        <InputField title='Username' htmlFor='name' id='name' type='text' />
        <InputField title='Password' htmlFor='password' id='password' type='password' />
        <Button title='Sign In'/>
      </Login>
    </LoginContainer>

  )
}

export default LoginForm;