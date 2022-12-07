// import React from "react";
import styled from "styled-components";

export const OuterWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const InnerWrapper = styled.section`
  width: 80%;
  @media (min-width: 668px) {
    width: 60%;
  }
  @media (min-width: 1025px){ 
    width: 50%;
  }
`