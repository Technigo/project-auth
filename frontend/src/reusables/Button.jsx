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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    background: var(--lightgreen);
  }

  @media all and (min-width: 744px) {
    width: 400px;
  }
`;

//component
export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
