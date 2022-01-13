import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const loadingDots = keyframes`
 0% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgb(161, 224, 253);
    }
    25% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        background: rgb(145, 122, 160);
    }
    50% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        background: rgb(250, 235, 215);
    }
    100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgb(161, 224, 253);
    }
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-sizing: content-box;
  background-color: #f7e793bf;
  padding: 10px;
  width: 45vh;
  border-radius: 10px;
  margin-top: 3vh;
`;

const LoadingText = styled.span`
  font-size: 25px;
  color: rgba(42, 45, 54, 0.753);
  font-weight: bold;
`;
const LoadingDots = styled.div`
  display: flex;
  column-gap: 2px;
  margin-left: 4px;
  &span {
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    animation-name: ${loadingDots};
    animation-duration: 1s;
    animation-iteration-count: infinite ease-in-out;
  }
  &span:nth-child(1) {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  &span:nth-child(2) {
    -webkit-animation-delay: 0.3s;
    -moz-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  &span:nth-child(3) {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  &span:nth-child(4) {
    -webkit-animation-delay: 0.5s;
    -moz-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
`;

const LoadingSpinner = () => {
  return (
    <LoadingOverlay>
      <LoadingText>Loading</LoadingText>
      <LoadingDots>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </LoadingDots>
    </LoadingOverlay>
  );
};

export default LoadingSpinner;
