/* eslint-disable react/prop-types */
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
  z-index: 1;

  &:hover {
    cursor: pointer;
  }

  @media all and (min-width: 744px) {
    width: 400px;
  }
`;

//component
export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
