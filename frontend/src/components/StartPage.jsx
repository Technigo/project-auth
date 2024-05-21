import { Link } from "react-router-dom";
import { StyledHeading } from "./StyledText.jsx";
import { StyledButton } from "./StyledButton.jsx";
import styled from "styled-components";

// StyledButtonContainer to hold the buttons
const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
`;

export const StartPage = () => {
  return (
    <div>
      <StyledHeading fontWeight="bold">Welcome,</StyledHeading>
      <StyledHeading>Glad to see you!</StyledHeading>
      <StyledButtonContainer>
        <Link to="/login">
          <StyledButton>Login</StyledButton>
        </Link>
        <Link to="/signup">
          <StyledButton>Sign Up</StyledButton>
        </Link>
      </StyledButtonContainer>
    </div>
  );
};
