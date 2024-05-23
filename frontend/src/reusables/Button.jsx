//import
import styled from "styled-components";

//styling
const StyledButton = styled.button`
  width: 280px;
  background: var(--darkgreen);
  border: none;
  border-radius: 30px;
  padding: 10px 50px;
  height: 50px;
  margin: 20px;
  color: var(--grey);
  font-family: "Abril Fatface", serif;
  font-weight: 400;
  font-size: 1.25em;

  @media all and (min-width: 744px) {
    width: 450px;
  }
`;

//component
export const Button = () => {
  return <StyledButton>Sign In</StyledButton>;
};
