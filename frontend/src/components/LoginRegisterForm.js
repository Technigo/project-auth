import React, { useState } from "react";
import styled from "styled-components"

const StyledButton = styled.button`
border-radius: 5px;`

const StyledForm = styled.form`
`


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
    <StyledForm onSubmit={(event) => {
      event.preventDefault();
      handleFormSubmit(event, state);
    }}>
      <h1>Form in state {state}</h1>
      {state === "register" && <input type="text" name="name" value={name} placeholder="enter your name" onChange={handleNameChange}/> }
      <input type="email" name="email" value={email} placeholder="enter your email" onChange={handleEmailChange}/>
      <input type="password" name="password" value={password} placeholder="enter your password" onChange={handlePasswordChange}/>
    <StyledButton type="submit" className={state}>{state==="login" ? "Login!" : "Register!"}</StyledButton>
    </StyledForm>
  );
};

export default LoginRegisterForm;
