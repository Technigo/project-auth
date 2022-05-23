import React from "react";
import { StyledForm } from "./Style";
import { LoginButton } from "./Style";
import { SignupButton } from "./Style";


const Form = () => {
return (
<article>
    <StyledForm>
        <label>Username
            <input type="text"></input>
        </label>
        <label>Password
            <input type="password"></input>
        </label>

        <LoginButton>Log in</LoginButton>
        <SignupButton>Sign up</SignupButton>
    </StyledForm>
    
</article>
)
}

export default Form