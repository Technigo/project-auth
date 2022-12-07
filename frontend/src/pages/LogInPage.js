import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InnerWrapper, UserInputWrapper } from '../assets/GlobalStyles'
import { Button } from '../assets/GlobalStyles'
import { UserInput } from 'components/UserInput'

export const LogInPage = () => {
  const navigate = useNavigate();
  const onRegisterButtonClick = () => {
    navigate('/register');}
  
    return (
        <InnerWrapper>
          <UserInputWrapper>
            <h1>Please log in</h1>
            <UserInput/>
            <p>Not a member? <Button onClick={onRegisterButtonClick}>Please register here</Button></p>
          </UserInputWrapper>
        </InnerWrapper>

    )

}





/* import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const onHomeButtonClick = () => {
    navigate('/');
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Error 404 Page Not Found</h1>
      <p>Sorry Movie Master, no such page</p>
      <button
        type="button"
        onClick={onHomeButtonClick}>Return to Home Page
      </button>
    </div>);
} */