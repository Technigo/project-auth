import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/NotFoundLottie";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LottieContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -100px;
  min-width: 200px;
  min-height: 200px;
`;

const Button = styled.button`
  border: transparent;
  font-family: inherit;
  color: #2d4858;
  width: 150px;
  height: 30px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  background-color: #f7e793;
  box-shadow: 2px 2px 12px #f7e793bf, -2px -2px 12px #f7e793bf;
  cursor: pointer;
  margin: -10vh;
  z-index: 1;
  :hover {
    box-shadow: 2px 2px 12px #2d4858bf, -2px -2px 12px #2d4858bf;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onButtonClick = () => {
    navigate("/signin");
  };

  return (
    <LottieContainer>
      <Lottie options={defaultOptions} />
      <Button className="gobackButton" onClick={onButtonClick}>
        Go back
      </Button>
    </LottieContainer>
  );
};

export default NotFound;
