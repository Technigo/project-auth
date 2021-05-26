import React from 'react'
import styled from 'styled-components/macro'

const SignUpForm = () => {

  return (
    <Wrapper>
      <Header>Sign up</Header>
      <Form>
        <Input
            type='text'
            placeholder='username'>
        </Input>
        <Input
            type='password'
            placeholder='•••••'>
        </Input>
        <Button>
          Sign up
        </Button>
      </Form>
      <SignUpText>Already a user? Sign in</SignUpText>
      <Button>Sign in</Button>
    </Wrapper>
  )
}

export default SignUpForm

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;

  @media (min-width: 767px){
    width: 50%;
    margin-top: 35px;
  }

  @media (min-width: 1024px) {
    width: 500px;
  }
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

  @media (min-width: 1024px) {
    font-size: 50px;
  }
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

  @media (min-width: 767px){
    font-size: 17px;
  }
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

  @media (min-width: 767px){
    font-size: 19px;
  }
`