import React from "react"
import styled from "styled-components"

export const OuterWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const InnerWrapper = styled.section`
  width: 80%;
  padding-top: 7vh;
  padding-bottom: 7vh;
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 60%;
  }
  @media (min-width: 1025px){ 
    width: 50%;
  }
`