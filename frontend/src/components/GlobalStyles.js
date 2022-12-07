// import React from "react";
import styled from "styled-components";

export const OuterWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #DEEDF0;
  font-family: 'Roboto', sans-serif;
`

export const InnerWrapper = styled.section`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 7px 0px #888888;
  padding: 40px;
  background-color: #FEF5ED;
  height: 35vh;

  @media (min-width: 668px) {
    width: 60%;
  }
  @media (min-width: 1025px){ 
    width: 50%;
  }
`

export const FormSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`