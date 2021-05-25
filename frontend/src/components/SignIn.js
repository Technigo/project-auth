import React from 'react'
import styled from 'styled-components/macro'

const SignInForm = () => {

  return (
    <Wrapper>
      <Header>Sign in</Header>
      <Form>
        <Input
            type='text'
            placeholder='username'>
        </Input>
        <Input
            type='text'
            placeholder='•••••'
            value='password'>
        </Input>
        <Button>
          Sign in
        </Button>
      </Form>
      <SignUpText>Not a user yet? Create an account</SignUpText>
      <Button>Sign up</Button>
    </Wrapper>
  )
}

export default SignInForm

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const Header = styled.h2`
  text-align: center;
  color: white;
  font-weight: 400;
  font-size: 40px;
`

const SignUpText = styled.h3`
  color: white;
  text-align: center;
`

const Input = styled.input`
  width: 100%;
  border-radius: 50px;
  outline: none;
  border: none;
  padding: 10px 20px;
  margin-bottom: 10px;
  // placeholder: raw("&bull;");
`

const Button = styled.button`
  border-radius: 8px;
  background-color: #006cde;
  background-image: linear-gradient(90deg, #006cde 0%, #FC00FF 100%);
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  outline: none;
  width: 100%;
  color: #FFF;
  font-size: 17px;
`