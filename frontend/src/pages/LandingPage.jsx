import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import background from "../assets/alper-guzeler-inQvRABkTfg-unsplash.jpg";
import styled from "styled-components/macro";
import triangle from "../assets/triangle.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Logo src={triangle} alt="esoteric triangle." />
      <NeonText>ʰᵉᴸᴸᵒ ᵘˢᵉʳ ʷᴱᴸᶜᴼᴹᵉ ʰᵒᴹᵉ</NeonText>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("signin")}
      >
        Click me, I insist
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
  background-position-y: center;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 0 12px #fff);
`;

const NeonText = styled.h1`
  margin: 2rem auto;
  font-weight: 400;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 21px #fff, 0 0 82px #fff, 0 0 92px #fff,
    0 0 102px #fff;
`;
