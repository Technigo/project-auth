import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "./Styled components/StyledButton";
import { StyledButtonContainer } from "./Styled components/StyledButtonContainer";
import { StyledBox } from "./Styled components/StyledBox";
import { MainContainer } from "./Styled components/MainContainer";

export const NotFound = () => {
  return (
    <MainContainer imageUrl="https://cdn.pixabay.com/photo/2016/06/29/22/02/parking-space-1487891_1280.jpg">
      
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