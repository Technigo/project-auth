import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 50%;
  border: 2px solid #b5838d;
  border-radius: 5px;
  background: rgb(141,136,150, 0.2);
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 3px;
  font-size: 22px;
  color: #6d6875;
`

const InputField = styled.input`
  border: solid 1px #6d6875;
  background-color: #b5838d;
  padding: 10px 20px;
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0px;
  color: black;
  border-radius: 5px;
`

const SignInButton = styled.button`
  border: solid 1px #6d6875;
  background-color: #b5838d;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 20px;
  outline: none;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  margin: 10px 5px 0px 5px;

  &:hover, &:focus {
    background: rgb(229, 152, 155, 0.5);
    border: solid 1px rgb(229, 152, 155);
  }
`

const RegisterText = styled.p`
  font-size: 22px;
  color: #6d6875;
`

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: #6d6875;
`

const ErrorMessage = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: #6d6875;
`

const SignInForm = ({ onFormSubmit, username, setUsername, password, setPassword, setMode }) => {
  const error = useSelector(store => store.user.errors)

  return (
    <Form onSubmit={onFormSubmit}>
      <SubContainer> 
        <Label htmlFor="input-username">Username</Label>
        <InputField 
          id="input-username"
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Label htmlFor="input-password">Password</Label>
        <InputField 
          id="input-password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </SubContainer>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}

      <SignInButton type="submit" onClick={() => setMode('signin')}>SIGN IN</SignInButton>

      <RegisterText>
        Not a user? 
        <RegisterLink to="/signup">Register here</RegisterLink> 
      </RegisterText>
  </Form>
  )
}

export default SignInForm