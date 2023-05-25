import React, { useState } from "react";
import styled from "styled-components"

const LoginRegisterForm = ({ state, name, setName, email, setEmail, password, setPassword, handleFormSubmit }) => {

    const handleNameChange = (event) => { 
        setName(event.target.value)
    }
    const handleEmailChange = (event) => { 
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => { 
        setPassword(event.target.value)
    }

  return (
    <Form 
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit(event, state);
      }}
    >
      <h1>Fill in your info to {state} here:</h1>
      <FormContainer>
      {state === "register" && ( 
        <StyledInput 
          type="text" 
          name="name" 
          value={name} 
          placeholder="Enter your name" 
          onChange={handleNameChange}
        /> 
      )}
        <StyledInput 
          type="email" 
          name="email" 
          value={email} 
          placeholder="Enter your email" 
        onChange={handleEmailChange}
      />
        <StyledInput 
          type="password" 
          name="password" 
          value={password} 
          placeholder="Enter your password" 
          onChange={handlePasswordChange}
      />
      </FormContainer>
      <StyledButton type="submit" className={state}>
        {state==="login" ? "Login!" : "Register!"}
      </StyledButton>
    </Form>
  );
};

export default LoginRegisterForm;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
// min-height: 100vh;
width: 100vw;
margin: 0;
// color: #91785d;
background-color: #869d7a;


h1 {
  // color: #493843;
  color: #56282d;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledButton = styled.button`
border-radius: 5px;
border: 1px solid #ffffff;
cursor: pointer;
width: 7rem;
background-color: #a7cdbd;
color: #ffffff;
font-size: 1rem;
font-weight: bold;
margin-top: 1.5rem;
padding: 10px;
`;

const StyledInput = styled.input`
height: 3rem;
border-radius: 5px;
font-size: 1rem;
font-weight: bold;
margin-left: 1rem;
// color: #160c28;
`;
