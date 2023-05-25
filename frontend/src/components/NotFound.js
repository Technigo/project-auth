import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
    return (
      <>
        <Container>
          <Wrapper>
            <Paragraph>Sorry, nothing here...</Paragraph>
            <ButtonContainer>
              <StyledButton as={Link} to="/login">
                GO TO LOGIN
              </StyledButton>
              <StyledButton as={Link} to="/">
                GO TO MAIN
              </StyledButton>
            </ButtonContainer>
          </Wrapper>
        </Container>
      </>
    );
  };
  

export default NotFound;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
color: black;
width: 40%;
padding: 50px;
background: #F2BA52;
border-radius: 15px;
border: 1px solid black;

&:hover {
    box-shadow: 5px 5px 0 0 black;
  }

@media screen and (max-width: 400px) {
    width: 60%;
}
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
cursor: pointer; 
color: white;
text-decoration: none;
border-radius: 15px;
padding: 8px;
gap: 1rem;
background-color: #F2BA52;
color: black;
border: 1px solid black;

&:hover {
    background-color: white;
  }
`

const Paragraph = styled.p`
color: white;
font-size: 1.3rem;
`