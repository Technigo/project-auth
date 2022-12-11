import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StyledDiv, StyledButton } from "GlobalStyles";
import styled from "styled-components/macro";

export const Form = ({ buttonText, formType, formTitle }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    //const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();
  
    const onSubmit = (event) => {
      event.preventDefault();
      fetch(`https://project-auth-ca23vvjbjq-lz.a.run.app/${formType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          password: password 
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.success){
            localStorage.setItem("accessToken", data.response.accessToken);
            localStorage.setItem("username", data.response.username);
            setUsername('')
            setPassword(''); 
            navigate("/welcome");
          } else {
            window.alert(data.response)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    // Save's what user types in form username field to state variable username
    const handleUsernameInput = (event) =>{
      setUsername(event.target.value)
    }

    // Save's what user types in form password field to a state variable password
    const handlePasswordInput = (event) =>{
      setPassword(event.target.value)
    }

    return (
      <StyledDiv>
        <h2>{formTitle}</h2>
        <StyledForm onSubmit={onSubmit}>
          <label>Username:
          <input type="text" value={username} onChange={handleUsernameInput}>
          </input>
          </label>
          <label>Password:
          <input type="password" value={password} onChange={handlePasswordInput}>
          </input>
          </label>
          <StyledButton type="submit">{buttonText}</StyledButton>
        </StyledForm>
      </StyledDiv>
    )
}

// Styling for above component
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