import React from "react";
import styled, { keyframes } from "styled-components/macro";

import girlLoading from "../assets/girl_loading.png";

export const Loading = ({ loadingText }) => {
  return (
    <LoaderContainer>
      <Title>{loadingText}</Title>
      <Image src={girlLoading}></Image>
    </LoaderContainer>
  );
};

const rotating = keyframes`
from { transform: rotate(-30deg) }
  to { transform: rotate(30deg) }
`;

const Image = styled.img`
  height: 60%;
  animation: ${rotating} 1s linear infinite alternate-reverse;
  @media (min-width: 600px) {
    height: 30%;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 40px;
  color: #6970f7;
`;
