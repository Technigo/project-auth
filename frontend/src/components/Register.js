import React from "react";
import { FormSection } from "./GlobalStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Register = () => {
    return (
    <FormSection>
        
        <h1>Sign up</h1>
        <Form>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="password"></input>
        </Form>
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

&:hover {
    transform: scale(1.1);
  }

` 