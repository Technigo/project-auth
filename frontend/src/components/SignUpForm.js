import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 50%;
  border: 2px solid rgb(7,75,50);
  border-radius: 5px;
  background: rgb(168,204,205, 0.4);
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 3px;
  font-size: 22px;
  color: #072d32;
`

const InputField = styled.input`
  border: solid 1px #072d32;
  background-color: #95afad;
  padding: 10px 20px;
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0px;
  color: black;
  border-radius: 5px;
`

const SignUpButton = styled.button`
  border: solid 1px #072d32;
  background-color: #95afad;
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
    background: rgb(204, 221, 226, 0.5);
    border: solid 1px rgb(50,100,91);
  }
`

const ErrorMessage = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: #072d32;
`

const SignUpForm = ({ onFormSubmit, username, setUsername, password, setPassword, setMode }) => {
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
          ></InputField>
        <Label htmlFor="input-password">Password</Label>
        <InputField
          id="input-password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        ></InputField>
      </SubContainer>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}

      <SignUpButton type="submit" onClick={() => setMode('signup')}>SIGN UP</SignUpButton>
    </Form>
  )
}

export default SignUpForm