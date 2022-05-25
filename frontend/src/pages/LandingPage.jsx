import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
// import background from '../assets/alper-guzeler-inQvRABkTfg-unsplash.jpg'
// import Button from '@mui/material'

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      Hello click to login{" "}
      <button onClick={() => navigate("signin")}>Sign in!</button>
    </>
  );
};

export default LandingPage;

// const PageContainer = styled.div`
// height: 100vh;
// width: 100vw;
// // background-image: url(${background});
// background-color: "black";
// `