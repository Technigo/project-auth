import React from 'react'
import styled from 'styled-components'

const Signup = (/* {onSubmitLogin} */) => {
  return (
    <Form /* onSubmitLogin={onSubmitLogin} */>
    <Title>Sign up form </Title>
      <label htmlFor='loginEmail'>Email</label>
      <input
        id='loginEmail'
        type='email'
        required
        /* value={loginEmail}
        onChange={onLogin} */
      />
      <label htmlFor='loginPassword'>Password</label>
      <input
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

export default Signup

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #939b62;
  width: 20%;
  padding: 30px 25px;
  border-radius: 10px;
`
const Title = styled.h1`
  margin: 0px;
  padding: 20px;
`
const Button = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  color: ;
  box-shadow: 0px 8px 15px rgba(12, 20, 80, 0.5);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`