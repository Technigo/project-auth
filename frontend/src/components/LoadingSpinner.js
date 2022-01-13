import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const loadingDots = keyframes`
 0% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: #76E8E6;
    }
    25% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        background: #FF7B6C;
    }
    50% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        background: #B0E5D9;
    }
    100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: #76E8E6;
    }
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-sizing: content-box;
  background-color: #f7e793bf;
  box-shadow: 2px 2px 12px #f7e793bf, -2px -2px 12px #f7e793bf;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  margin-top: 3vh;
`;

const LoadingText = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: #165d69;
`;
const LoadingDots = styled.div`
  display: flex;
  column-gap: 2px;
  margin-left: 4px;
  > .dots {
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    animation-name: ${loadingDots};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  > .dots:nth-child(1) {
    animation-delay: 0.2s;
  }
  > .dots:nth-child(2) {
    animation-delay: 0.3s;
  }
  > .dots:nth-child(3) {
    animation-delay: 0.4s;
  }
  > .dots:nth-child(4) {
    animation-delay: 0.5s;
  }
`;

const LoadingSpinner = () => {
  return (
    <LoadingOverlay>
      <LoadingText>Loading</LoadingText>
      <LoadingDots>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
      </LoadingDots>
    </LoadingOverlay>
  );
};

export default LoadingSpinner;
