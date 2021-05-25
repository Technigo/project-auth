import React from 'react'
import styled from 'styled-components'

const Login = (/* {onSubmitLogin} */) => {
  return (
    <Form /* onSubmitLogin={onSubmitLogin} */>
    <Title>Log in form </Title>
      <label htmlFor='loginEmail'>Email</label>
      <Input
        id='loginEmail'
        type='email'
        required
        /* value={loginEmail}
        onChange={onLogin} */
      />
      <label htmlFor='loginPassword'>Password</label>
      <Input
        id='loginPassword'
        type='password'
        required
        /* value={loginPassword}
        onChange={onLogin} */
      />
      <Button type='submit'>LOGIN</Button>
    </Form>
  )
}

export default Login

const Title = styled.h1`
  margin: 0px;
  padding: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #939b62;
  width: 20%;
  padding: 30px 25px;
  border-radius: 10px;
`

const Button = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  color: ;
  box-shadow: 0px 8px 15px rgba(100, 80, 18, 0.6);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
`