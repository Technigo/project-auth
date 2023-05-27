import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const MainContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: grayscale(50%);
`;
