import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import background from "../assets/alper-guzeler-inQvRABkTfg-unsplash.jpg";
// import Button from '@mui/material'
import styled from "styled-components/macro";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <NeonText>Hello! Click to sign in.</NeonText>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("signin")}
      >
        Sign in!
      </Button>
    </PageContainer>
  );
};

export default LandingPage;

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
`;

const NeonText = styled.h1`
  margin: 2rem auto;
  font-weight: 400;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 21px #fff, 0 0 82px #fff, 0 0 92px #fff,
    0 0 102px #fff;
`;
