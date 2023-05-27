import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "./Styled components/StyledButton";
import { StyledBox } from "./Styled components/StyledBox";
import { StyledButtonContainer } from "./Styled components/StyledButtonContainer";
import { MainContainer } from "./Styled components/MainContainer";

export const Startpage = () => {
    return (
        <MainContainer imageUrl="https://images.unsplash.com/photo-1483706600674-e0c87d3fe85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1814&q=80">
            <StyledBox>
                <h1>Do yo wanna know a secret?</h1>
                <StyledButtonContainer>
                    <Link to="/register">
                        <StyledButton variant="outlined">REGISTER</StyledButton>
                    </Link>

                    <Link to="/login">
                        <StyledButton variant="outlined">LOGIN</StyledButton>
                    </Link>
                </StyledButtonContainer>
            </StyledBox>
        </MainContainer>  
    )
};