import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "./Styled components/StyledButton";
import { StyledButtonContainer } from "./Styled components/StyledButtonContainer";
import { StyledBox } from "./Styled components/StyledBox";
import { MainContainer } from "./Styled components/MainContainer";

export const NotFound = () => {
  return (
    <MainContainer imageUrl="https://images.unsplash.com/photo-1546709843-e35cf3d3002d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8">
      
      <StyledBox>
        <p>PAGE COULD NOT BE FOUND :(</p>

        <StyledButtonContainer>
          
          <Link to="/login">
            <StyledButton variant="outlined">
              GO TO LOGIN
            </StyledButton>
          </Link>

          <Link to="/">
            <StyledButton variant="outlined">
              GO TO STARTPAGE
            </StyledButton>
          </Link>

        </StyledButtonContainer>
      
      </StyledBox>
    
    </MainContainer>
  );
};