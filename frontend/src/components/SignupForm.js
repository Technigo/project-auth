import React from "react";
import Header from 'components/Header'
import Footer from 'components/Footer'
import { SignupButton } from "./Style";

const SignupForm = () => {
    return (
    <article>
        <Header />
            <SignupButton>Sign up</SignupButton>
        <Footer />
    </article>
    )
    
}

export default SignupForm