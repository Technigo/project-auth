import React from "react";
import { HeaderContainer, HeaderTitle } from "./Style";
import SignupForm from "./SignupForm";

const Header = () => {
    return (
        <HeaderContainer>
        <HeaderTitle>Welcome!</HeaderTitle>
        <SignupForm />
        </HeaderContainer>
    ) 
}

export default Header 