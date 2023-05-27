import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "./Styled components/StyledButton";
import { StyledButtonContainer } from "./Styled components/StyledButtonContainer";
import { StyledBox } from "./Styled components/StyledBox";
import { MainContainer } from "./Styled components/MainContainer";
import { StyledLink } from "./Styled components/StyledButton";

export const NotFound = () => {
  return (
    <MainContainer imageUrl="https://cdn.pixabay.com/photo/2016/06/29/22/02/parking-space-1487891_1280.jpg">
      
      <StyledBox>
        <p>PAGE COULD NOT BE FOUND :(</p>

        <StyledButtonContainer>
          
          <StyledLink to="/login">
            <StyledButton variant="outlined">
              GO TO LOGIN
            </StyledButton>
          </StyledLink>

          <StyledLink to="/">
            <StyledButton variant="outlined">
              GO TO STARTPAGE
            </StyledButton>
          </StyledLink>

        </StyledButtonContainer>
      
      </StyledBox>
    
    </MainContainer>
  );
};