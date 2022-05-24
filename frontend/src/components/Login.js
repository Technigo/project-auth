import React from "react";
import styled from "styled-components";


const LoginContainer = styled.div`
    background-color: #82DBE5;
    padding: 20px;
`

const InputContainer = styled.div`
    display: flex;
    margin: 10px 0;
`
const LoginLabel = styled.label`
    margin-right: 5px;
`


const Login = () => {
    return (
        <LoginContainer>
            <h2>Log in</h2>
            <form>
                <InputContainer>
                    <LoginLabel for="username">User name</LoginLabel>
                    <input id="username" type="text"></input>
                </InputContainer>
                <InputContainer>
                    <LoginLabel for="password">Password</LoginLabel>
                    <input id="password" type="password"></input>
                </InputContainer>
                <button type="submit">Login</button>
            </form>
        </LoginContainer>

    );

}

export default Login;