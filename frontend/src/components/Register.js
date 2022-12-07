
import React, { useState } from 'react'
import { FormSection } from "./GlobalStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Register = () => {
    const [ username, setUsername] = useState("")
    const [ password, setPassword ] = useState("")
    
    return (
    <FormSection>  
        <PageHeader>Sign up</PageHeader>
        <Form>
            <Input 
            id='username' 
            type="text" 
            value={username}
            placeholder="Choose username"
            onChange={(e) => setUsername(e.target.value)}/>
            <Input 
            id="password"
            type="password" 
            value={password}
            placeholder="Choose password"
            onChange={(e) => setPassword(e.target.value)}/>
        </Form>
        <Button type="submit">Create account</Button>
        <p>Already a user?</p>
        <ButtonLink to="/login">Log in</ButtonLink>
    </FormSection>
    )
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`
export const ButtonLink = styled(Link)`
 color: black;
 transition: ease-out 0.2s;
 cursor: pointer;
 font-size: 20px;
 text-decoration: none;
 //border: 1px solid black;
 padding: 5px 10px;
 border-radius: 5px;
 box-shadow: 0px 0px 7px 0px #888888;
 background-color: #F4C7AB;

&:hover {
    transform: scale(1.1);
  }
` 
export const Input = styled.input`
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
  transition: ease-out 0.2s;
  border: 1px solid black;

    &:hover {
    transform: scale(1.05);
  }
`
export const Button = styled.button`
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    //border: 1px solid black;
    border: 0px;
    transition: ease-out 0.2s;
    background-color: #F4C7AB;
    border-radius: 5px;
    box-shadow: 0px 0px 7px 0px #888888;
    font-size: 15px;
    font-weight: 400;


&:hover {
    transform: scale(1.05);
  }
`
export const PageHeader = styled.h1`
    font-size: 25px;
    margin: 20px;
`