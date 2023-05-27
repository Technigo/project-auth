import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
`;


export const StyledButton = styled(Button)`
  color: black;
  border-color: black;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;