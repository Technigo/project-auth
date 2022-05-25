import React from "react";
import { StyledForm, LoginButton, LoginHeadline, UsernameLabel, PasswordLabel, UsernameInput, PasswordInput } from "./Style";
import Header from "./Header";
import Footer from "./Footer";

const LoginForm = () => {
return (
<article>
    <Header />
    <StyledForm>
        <LoginHeadline>Already a member?</LoginHeadline>
        <UsernameLabel>Username
            <UsernameInput type="email"></UsernameInput>
        </UsernameLabel>
        <PasswordLabel>Password
            <PasswordInput type="password"></PasswordInput>
        </PasswordLabel>
        <LoginButton>Log in</LoginButton>
    </StyledForm>
    <Footer />
    
</article>
)
}

export default LoginForm