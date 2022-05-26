import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import NotFoundIcon from "../assets/404-error.png";
import styled from "styled-components";
import { Container, Stack, Typography } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xs">
      <Stack spacing={2} mt={12}>
        <Icon src={NotFoundIcon} alt="404 error icon." />
        <Typography
          variant="h1"
          fontSize={24}
          fontWeight={500}
          textAlign="center"
          color="secondary"
        >
          Page Not Found
        </Typography>
        <Button
          onClick={() => navigate("/")}
          color="secondary"
          variant="contained"
        >
          Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;

const Icon = styled.img`
  height: 200px;
  width: 200px;
  margin: 0 auto;
`;
