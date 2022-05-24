import React from "react";
import styled from "styled-components";

const RegisterContainer = styled.div`
    background-color: #F759A0;
    padding: 20px;
`
const InputContainer = styled.div`
    display: flex;
    margin: 10px 0;
`

const RegisterLabel = styled.label`
    margin-right: 5px;
`

const Register = () => {
    return (
        <RegisterContainer>
            <h2>Register</h2>
            <form>
                <InputContainer>
                    <RegisterLabel for="username">User name</RegisterLabel>
                    <input id="username" type="text"></input>
                </InputContainer>
                <InputContainer>
                    <RegisterLabel for="password">Password</RegisterLabel>
                    <input id="password" type="password"></input>
                </InputContainer>

                <button type="submit">Register</button>
            </form>
        </RegisterContainer>

    );

}

export default Register;