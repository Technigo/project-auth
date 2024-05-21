import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 1em;
  padding: 0.75em;
  margin: 0.25em;
  width: 350px;
  color: #000000;
  background-color: #ffffff;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;
