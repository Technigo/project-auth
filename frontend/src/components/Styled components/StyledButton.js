import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
  color: black;
  border-color: black;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
