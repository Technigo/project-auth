import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
  color: white;
  border-color: white;
  text-decoration: none;
  &:hover {
    color: black;
    border-color: black;
    background-color: white;
  }
`;
