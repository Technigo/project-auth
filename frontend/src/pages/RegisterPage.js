import React from 'react'
import { InnerWrapper, UserInputWrapper, Button } from '../assets/GlobalStyles'
import { UserInput } from 'components/UserInput'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate();
  const onRegisterButtonClick = () => {
    navigate('/login');}

    return (
        <InnerWrapper>
          <UserInputWrapper>
            <h1>Please Register</h1>
            <UserInput/>
            <p>Already a member? <Button onClick={onRegisterButtonClick}>Please log in here</Button></p>
          </UserInputWrapper>
        </InnerWrapper>

    )

}