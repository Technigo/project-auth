import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { StyledDiv, StyledButton } from "GlobalStyles";
import styled from "styled-components";

export const Form = ({ buttonText, formType, formTitle, token }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();
  
    const onSubmit = (event) => {
      event.preventDefault()
      fetch(`https://project-auth-ca23vvjbjq-lz.a.run.app/${formType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.success){
            console.log('Success:', data)
            localStorage.setItem("accessToken", data.response.accessToken);
            localStorage.setItem("username", data.response.username);
            setUsername('')
            setPassword(''); 
            navigate("/welcome");
          } else {
            console.log(data.response)
            window.alert(data.response)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    
    }

    const handleUsernameInput = (event) =>{
      setUsername(event.target.value)
    }

    const handlePasswordInput = (event) =>{
      setPassword(event.target.value)
    }

   return(
    <StyledDiv>
      <h2>{formTitle}</h2>
      <StyledForm onSubmit={onSubmit}>
        <label>Username:
        <input type="text" value={username} onChange={handleUsernameInput}>
        </input>
        </label>
        <label>Password:
        <input type="text" value={password} onChange={handlePasswordInput}>
        </input>
        </label>
        <StyledButton type="submit">{buttonText}</StyledButton>
      </StyledForm>
    </StyledDiv>
   )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  label {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }

  label + button {
    margin-top: 10px;
  }

  input {
    margin-left: 10px;
    border-radius: 5px;
    border: none;
  }
`