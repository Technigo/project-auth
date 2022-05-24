import React from "react";
import { StyledForm, LoginButton, LoginHeadline, UsernameLabel, PasswordLabel, UsernameInput, PasswordInput } from "./Style";

const LoginForm = () => {
return (
<article>
    <StyledForm>
        <LoginHeadline>Already a member?</LoginHeadline>
        <UsernameLabel>Username
            <UsernameInput type="text"></UsernameInput>
        </UsernameLabel>
        <PasswordLabel>Password
            <PasswordInput type="password"></PasswordInput>
        </PasswordLabel>
        <LoginButton>Log in</LoginButton>
    </StyledForm>
    
</article>
)
}

export default LoginForm